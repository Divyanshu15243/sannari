import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Video } from 'lucide-react';
import { PageHero } from '../components/Common';
import { BRAND } from '../data/store';
import { useShop } from '../context/ShopContext';

export default function Contact() {
  const { notify } = useShop();
  const [tab, setTab] = useState('message');
  const submit = (e) => { e.preventDefault(); notify(tab === 'message' ? 'Message sent (UI demo)' : 'Appointment requested (UI demo)'); e.target.reset(); };

  return (
    <>
      <PageHero title="Contact us" text="We usually reply within a few hours, Monday to Saturday." />
      <div className="container contact">
        <div className="card">
          <div className="tabs">
            <button className={tab === 'message' ? 'on' : ''} onClick={() => setTab('message')}>Send a message</button>
            <button className={tab === 'video' ? 'on' : ''} onClick={() => setTab('video')}><Video size={16} /> Book video call</button>
          </div>
          <form className="form" onSubmit={submit} key={tab}>
            <div className="two"><label>Full name<input required /></label><label>Phone / WhatsApp<input required inputMode="tel" /></label></div>
            <label>Email<input type="email" required /></label>
            {tab === 'video' ? (
              <>
                <div className="two">
                  <label>Preferred date<input type="date" required /></label>
                  <label>Time slot<select required defaultValue=""><option value="" disabled>Choose a slot</option><option>10:00 – 11:00 AM</option><option>12:00 – 1:00 PM</option><option>3:00 – 4:00 PM</option><option>5:00 – 6:00 PM</option></select></label>
                </div>
                <label>What are you shopping for?<textarea placeholder="e.g. Bridal lehenga in red, budget ₹20,000" /></label>
              </>
            ) : (
              <>
                <label>Topic<select defaultValue="Order help"><option>Order help</option><option>Custom stitching</option><option>Returns & exchange</option><option>Wholesale</option><option>Other</option></select></label>
                <label>Message<textarea required /></label>
              </>
            )}
            <button className="btn">{tab === 'video' ? 'Request appointment' : 'Send message'}</button>
          </form>
        </div>
        <aside className="contact-info">
          <div className="info-item"><Phone size={20} /><div><b>Customer care</b><span>{BRAND.phone}</span></div></div>
          <div className="info-item"><Mail size={20} /><div><b>Email</b><span>{BRAND.email}</span></div></div>
          <div className="info-item"><Clock size={20} /><div><b>Hours</b><span>Mon–Sat, 9 AM–6 PM</span></div></div>
          <div className="info-item"><MapPin size={20} /><div><b>Studio</b><span>{BRAND.city}, India</span></div></div>
          <a className="btn whatsapp-btn block" href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chat on WhatsApp</a>
          <div className="map-placeholder"><MapPin size={28} /><span>Map embed goes here</span></div>
        </aside>
      </div>
    </>
  );
}

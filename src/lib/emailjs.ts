const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const BOOKING_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID as string;
const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID as string;
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID as string;

const OWNER_EMAIL = 'info@innerlijkerustnoord.nl';

async function sendEmail(templateId: string, templateParams: Record<string, string>): Promise<void> {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: templateId,
      user_id: PUBLIC_KEY,
      template_params: templateParams,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`EmailJS error ${res.status}: ${text}`);
  }
}

export interface BookingEmailParams {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_title: string;
  service_price: string;
  appointment_date: string;
  appointment_time: string;
  appointment_end_time: string;
  notes: string;
}

export interface ContactEmailParams {
  from_name: string;
  from_email: string;
  message: string;
}

export async function sendBookingConfirmation(params: BookingEmailParams): Promise<void> {
  const baseParams = {
    customer_name: params.customer_name,
    customer_email: params.customer_email,
    customer_phone: params.customer_phone,
    service_title: params.service_title,
    service: params.service_title,
    service_price: params.service_price,
    appointment_date: params.appointment_date,
    appointment_time: params.appointment_time,
    appointment_end_time: params.appointment_end_time,
    notes: params.notes,
  };

  const promises: Promise<void>[] = [];

  // Bevestiging naar klant
  if (params.customer_email && BOOKING_TEMPLATE_ID) {
    promises.push(sendEmail(BOOKING_TEMPLATE_ID, { ...baseParams, to_email: params.customer_email }));
  }

  // Notificatie naar eigenaar via Contact Us template
  if (ADMIN_TEMPLATE_ID) {
    promises.push(sendEmail(ADMIN_TEMPLATE_ID, {
      ...baseParams,
      to_email: OWNER_EMAIL,
      from_name: params.customer_name,
      from_email: params.customer_email,
      message: `Nieuwe boeking\n\nService: ${params.service_title}\nDatum: ${params.appointment_date}\nTijd: ${params.appointment_time} – ${params.appointment_end_time}\nPrijs: ${params.service_price}\nTelefoon: ${params.customer_phone}${params.notes ? `\nNotities: ${params.notes}` : ''}`,
    }));
  }

  await Promise.all(promises);
}

export function sendContactMessage(params: ContactEmailParams): Promise<void> {
  return sendEmail(CONTACT_TEMPLATE_ID, {
    from_name: params.from_name,
    from_email: params.from_email,
    message: params.message,
    to_email: OWNER_EMAIL,
  });
}

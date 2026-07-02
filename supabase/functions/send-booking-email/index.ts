import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const OWNER_EMAIL = "info@innerlijkerustnoord.nl";
const OWNER_PHONE = "+31 6 00 00 00 00";

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  return `${Math.floor(total / 60).toString().padStart(2, "0")}:${(total % 60).toString().padStart(2, "0")}`;
}

function buildCustomerEmail(params: {
  customer_name: string;
  customer_email: string;
  service_title: string;
  service_price: number;
  service_duration: number;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}): string {
  const startTime = params.appointment_time.slice(0, 5);
  const endTime = addMinutes(startTime, params.service_duration);

  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Boekingsbevestiging</title></head>
<body style="margin:0;padding:0;background-color:#EFE3D5;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:40px auto;background:#F5EBE0;border:1px solid #c4a487;">

    <div style="background-color:#1a1f14;padding:36px 40px;text-align:center;">
      <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#D4A373;">Groningen</p>
      <h1 style="margin:0;font-size:26px;color:#F5EBE0;letter-spacing:0.02em;font-weight:300;">Innerlijke Rust Noord</h1>
    </div>

    <div style="padding:40px 40px 8px;">
      <p style="font-family:Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.25em;color:#D4A373;margin:0 0 4px;">Boekingsbevestiging</p>
      <h2 style="margin:0 0 20px;font-size:28px;color:#6B705C;font-weight:300;letter-spacing:-0.02em;">Beste ${params.customer_name},</h2>
      <p style="color:#A98467;font-size:14px;font-family:Arial,sans-serif;line-height:1.8;margin:0 0 32px;">
        Bedankt voor je boeking bij Innerlijke Rust Noord! Hieronder vind je een overzicht van je afspraak.
        Ik neem binnen 24 uur contact met je op ter bevestiging.
      </p>
    </div>

    <div style="margin:0 40px 32px;background:#EFE3D5;border:1px solid #c4a487;padding:28px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid rgba(196,164,135,0.3);">
          <td style="padding:10px 0;font-family:Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#A98467;">Behandeling</td>
          <td style="padding:10px 0;font-size:14px;color:#6B705C;text-align:right;font-family:Arial,sans-serif;">${params.service_title}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(196,164,135,0.3);">
          <td style="padding:10px 0;font-family:Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#A98467;">Datum</td>
          <td style="padding:10px 0;font-size:14px;color:#6B705C;text-align:right;font-family:Arial,sans-serif;text-transform:capitalize;">${formatDate(params.appointment_date)}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(196,164,135,0.3);">
          <td style="padding:10px 0;font-family:Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#A98467;">Tijd</td>
          <td style="padding:10px 0;font-size:14px;color:#6B705C;text-align:right;font-family:Arial,sans-serif;">${startTime} – ${endTime}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;font-family:Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#A98467;">Prijs</td>
          <td style="padding:10px 0;font-size:24px;color:#D4A373;text-align:right;">€${params.service_price.toFixed(2)}</td>
        </tr>
        ${params.notes ? `<tr style="border-top:1px solid rgba(196,164,135,0.3);"><td style="padding:10px 0;font-family:Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#A98467;">Opmerking</td><td style="padding:10px 0;font-size:13px;color:#6B705C;text-align:right;font-family:Arial,sans-serif;">${params.notes}</td></tr>` : ""}
      </table>
    </div>

    <div style="padding:0 40px 40px;">
      <p style="color:#A98467;font-family:Arial,sans-serif;font-size:13px;line-height:1.8;margin:0 0 6px;">
        Wil je annuleren of wijzigen? Dat kan kosteloos tot 24 uur voor de afspraak:
      </p>
      <p style="color:#A98467;font-family:Arial,sans-serif;font-size:13px;margin:0 0 32px;">
        <a href="mailto:${OWNER_EMAIL}" style="color:#D4A373;text-decoration:none;">${OWNER_EMAIL}</a>
        &nbsp;&middot;&nbsp;
        <a href="tel:${OWNER_PHONE.replace(/\s/g, '')}" style="color:#D4A373;text-decoration:none;">${OWNER_PHONE}</a>
      </p>
      <p style="color:#c4a487;font-family:Arial,sans-serif;font-size:11px;line-height:1.7;margin:0;">
        Tot snel op de mat!<br>
        <strong style="color:#6B705C;">Innerlijke Rust Noord</strong> &middot; Ulgersmaweg 137, Groningen
      </p>
    </div>

    <div style="background:#1a1f14;padding:16px 40px;text-align:center;">
      <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;color:rgba(239,227,213,0.35);letter-spacing:0.15em;text-transform:uppercase;">
        &copy; ${new Date().getFullYear()} Innerlijke Rust Noord &middot; Groningen
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildAdminEmail(params: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_title: string;
  service_price: number;
  service_duration: number;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}): string {
  const startTime = params.appointment_time.slice(0, 5);
  const endTime = addMinutes(startTime, params.service_duration);

  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><title>Nieuwe boeking</title></head>
<body style="margin:0;padding:0;background:#EFE3D5;font-family:Arial,sans-serif;">
  <div style="max-width:500px;margin:40px auto;background:#F5EBE0;border:1px solid #c4a487;">

    <div style="background:#1a1f14;padding:28px 32px;">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#D4A373;">Dashboard</p>
      <h1 style="margin:0;font-size:20px;color:#F5EBE0;font-weight:300;">Nieuwe boeking ontvangen</h1>
    </div>

    <div style="padding:32px;">
      <p style="margin:0 0 24px;font-size:13px;color:#A98467;line-height:1.7;">
        Er is een nieuwe boeking binnengekomen via de website.
      </p>

      <div style="background:#EFE3D5;border:1px solid #c4a487;padding:20px;margin-bottom:24px;">
        <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#A98467;">Klantgegevens</p>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <tr><td style="padding:5px 0;color:#A98467;width:35%;">Naam</td><td style="color:#6B705C;font-weight:500;">${params.customer_name}</td></tr>
          <tr><td style="padding:5px 0;color:#A98467;">E-mail</td><td style="color:#6B705C;">${params.customer_email ? `<a href="mailto:${params.customer_email}" style="color:#D4A373;text-decoration:none;">${params.customer_email}</a>` : "—"}</td></tr>
          <tr><td style="padding:5px 0;color:#A98467;">Telefoon</td><td style="color:#6B705C;">${params.customer_phone ? `<a href="tel:${params.customer_phone.replace(/\s/g, '')}" style="color:#D4A373;text-decoration:none;">${params.customer_phone}</a>` : "—"}</td></tr>
        </table>
      </div>

      <div style="background:#EFE3D5;border:1px solid #c4a487;padding:20px;margin-bottom:24px;">
        <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#A98467;">Afspraakdetails</p>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <tr><td style="padding:5px 0;color:#A98467;width:35%;">Behandeling</td><td style="color:#6B705C;font-weight:500;">${params.service_title}</td></tr>
          <tr><td style="padding:5px 0;color:#A98467;">Datum</td><td style="color:#6B705C;text-transform:capitalize;">${formatDate(params.appointment_date)}</td></tr>
          <tr><td style="padding:5px 0;color:#A98467;">Tijd</td><td style="color:#6B705C;">${startTime} – ${endTime}</td></tr>
          <tr><td style="padding:5px 0;color:#A98467;">Prijs</td><td style="color:#D4A373;font-size:18px;">€${params.service_price.toFixed(2)}</td></tr>
          ${params.notes ? `<tr><td style="padding:5px 0;color:#A98467;vertical-align:top;">Opmerking</td><td style="color:#6B705C;">${params.notes}</td></tr>` : ""}
        </table>
      </div>

      <p style="margin:0;font-size:12px;color:#A98467;">
        Vergeet niet te bevestigen via e-mail of telefoon.
      </p>
    </div>

    <div style="background:#EFE3D5;padding:14px 32px;border-top:1px solid #c4a487;text-align:center;">
      <p style="margin:0;font-size:10px;color:#A98467;letter-spacing:0.15em;text-transform:uppercase;">
        Innerlijke Rust Noord &middot; Groningen
      </p>
    </div>
  </div>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      service_id,
      appointment_date,
      appointment_time,
      notes,
    } = body;

    // Fetch service details from Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendKey = Deno.env.get("RESEND_API_KEY");

    const client = createClient(supabaseUrl, serviceRoleKey);
    const { data: service, error: svcErr } = await client
      .from("services")
      .select("title, price, duration")
      .eq("id", service_id)
      .maybeSingle();

    if (svcErr || !service) {
      console.error("Service fetch error:", svcErr);
      return new Response(JSON.stringify({ error: "Service not found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!resendKey) {
      console.warn("RESEND_API_KEY not set — skipping email");
      return new Response(JSON.stringify({ ok: true, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailParams = {
      customer_name: customer_name || "Klant",
      customer_email: customer_email || "",
      customer_phone: customer_phone || "",
      service_title: service.title,
      service_price: Number(service.price),
      service_duration: Number(service.duration),
      appointment_date,
      appointment_time,
      notes: notes || "",
    };

    const sendEmail = (to: string, subject: string, html: string) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Innerlijke Rust Noord <onboarding@resend.dev>",
          to: [to],
          subject,
          html,
        }),
      });

    const promises: Promise<Response>[] = [];

    // Klant bevestiging
    if (customer_email) {
      promises.push(
        sendEmail(
          customer_email,
          `Boekingsbevestiging – ${service.title}`,
          buildCustomerEmail(emailParams)
        )
      );
    }

    // Eigenaar notificatie
    promises.push(
      sendEmail(
        OWNER_EMAIL,
        `Nieuwe boeking: ${service.title} – ${customer_name}`,
        buildAdminEmail(emailParams)
      )
    );

    await Promise.all(promises);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-booking-email error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

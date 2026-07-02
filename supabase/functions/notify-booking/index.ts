import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const OWNER_EMAIL = "info@innerlijkerustnoord.nl";

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

function buildCustomerEmail(data: Record<string, string>): string {
  const endTime = data.appointment_time && data.service_duration
    ? addMinutes(data.appointment_time.slice(0, 5), parseInt(data.service_duration))
    : "";
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Boekingsbevestiging</title></head>
<body style="margin:0;padding:0;background-color:#EFE3D5;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:40px auto;background:#F5EBE0;border:1px solid #c4a487;">
    <div style="background-color:#6B705C;padding:32px 40px;text-align:center;">
      <h1 style="margin:0;font-size:24px;color:#F5EBE0;letter-spacing:0.05em;">Innerlijke Rust Noord</h1>
      <p style="margin:8px 0 0;font-size:12px;color:rgba(245,235,224,0.7);letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Boekingsbevestiging</p>
    </div>
    <div style="padding:40px;">
      <p style="color:#6B705C;font-size:16px;margin:0 0 24px;">Beste ${data.name},</p>
      <p style="color:#A98467;font-size:14px;font-family:Arial,sans-serif;line-height:1.7;margin:0 0 32px;">
        Bedankt voor je boeking! Hieronder vind je een overzicht van je afspraak. Ik neem binnen 24 uur contact met je op ter bevestiging.
      </p>
      <div style="background:#EFE3D5;border:1px solid #c4a487;padding:24px;margin-bottom:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-family:Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#A98467;">Behandeling</td><td style="padding:8px 0;font-size:14px;color:#6B705C;text-align:right;">${data.service_title}</td></tr>
          <tr><td style="padding:8px 0;font-family:Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#A98467;">Datum</td><td style="padding:8px 0;font-size:14px;color:#6B705C;text-align:right;text-transform:capitalize;">${formatDate(data.appointment_date)}</td></tr>
          <tr><td style="padding:8px 0;font-family:Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#A98467;">Tijd</td><td style="padding:8px 0;font-size:14px;color:#6B705C;text-align:right;">${data.appointment_time?.slice(0, 5)}${endTime ? ` – ${endTime}` : ""}</td></tr>
          <tr><td style="padding:8px 0;font-family:Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#A98467;">Prijs</td><td style="padding:8px 0;font-size:20px;color:#D4A373;text-align:right;">€${parseFloat(data.service_price || "0").toFixed(2)}</td></tr>
        </table>
      </div>
      <p style="color:#A98467;font-family:Arial,sans-serif;font-size:12px;line-height:1.7;margin:0 0 8px;">
        Kosteloos annuleren tot 24 uur voor de afspraak via:
      </p>
      <p style="color:#A98467;font-family:Arial,sans-serif;font-size:12px;margin:0 0 32px;">
        E-mail: <a href="mailto:${OWNER_EMAIL}" style="color:#D4A373;">${OWNER_EMAIL}</a><br>
        Telefoon: <a href="tel:${OWNER_PHONE}" style="color:#D4A373;">${OWNER_PHONE}</a>
      </p>
    </div>
    <div style="background:#EFE3D5;padding:20px 40px;text-align:center;border-top:1px solid #c4a487;">
      <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#A98467;">Innerlijke Rust Noord · Groningen</p>
    </div>
  </div>
</body>
</html>`;
}

function buildAdminEmail(data: Record<string, string>): string {
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><title>Nieuwe boeking</title></head>
<body style="margin:0;padding:0;background:#EFE3D5;font-family:Arial,sans-serif;">
  <div style="max-width:480px;margin:40px auto;background:#F5EBE0;border:1px solid #c4a487;padding:32px;">
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;color:#6B705C;">Nieuwe boeking ontvangen</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#6B705C;">
      <tr><td style="padding:6px 0;color:#A98467;width:40%;">Naam</td><td>${data.name}</td></tr>
      <tr><td style="padding:6px 0;color:#A98467;">E-mail</td><td>${data.email || "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#A98467;">Telefoon</td><td>${data.phone || "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#A98467;">Behandeling</td><td>${data.service_title}</td></tr>
      <tr><td style="padding:6px 0;color:#A98467;">Datum</td><td style="text-transform:capitalize;">${formatDate(data.appointment_date)}</td></tr>
      <tr><td style="padding:6px 0;color:#A98467;">Tijd</td><td>${data.appointment_time?.slice(0, 5)}</td></tr>
      ${data.notes ? `<tr><td style="padding:6px 0;color:#A98467;">Opmerking</td><td>${data.notes}</td></tr>` : ""}
    </table>
    <p style="margin:24px 0 0;font-size:12px;color:#A98467;">
      <a href="${Deno.env.get("VITE_SUPABASE_URL") || ""}/admin" style="color:#D4A373;">Bekijk in dashboard →</a>
    </p>
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
    const resendKey = Deno.env.get("RESEND_API_KEY");

    if (resendKey) {
      // Customer confirmation
      if (body.email) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Innerlijke Rust Noord <noreply@innerlijkerustnoord.nl>",
            to: [body.email],
            subject: `Boekingsbevestiging – ${body.service_title}`,
            html: buildCustomerEmail(body),
          }),
        });
      }

      // Admin notification
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Innerlijke Rust Noord <noreply@innerlijkerustnoord.nl>",
          to: [OWNER_EMAIL],
          subject: `Nieuwe boeking: ${body.service_title} – ${body.name}`,
          html: buildAdminEmail(body),
        }),
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

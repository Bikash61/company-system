import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly resend: Resend;
  private readonly from: string;
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY') ?? '';
    this.resend = new Resend(apiKey);
    this.from =
      this.configService.get<string>('MAIL_FROM') ??
      'Austere-Analytics <hello@austere-analytics.com>';
  }

  // -----------------------------------------------------------------------
  // Lead notifications
  // -----------------------------------------------------------------------

  async sendLeadNotification(lead: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }): Promise<void> {
    const adminEmail =
      this.configService.get<string>('ADMIN_EMAIL') ?? this.from;

    try {
      await this.resend.emails.send({
        from: this.from,
        to: [adminEmail],
        subject: `New lead: ${lead.name}`,
        html: `
          <h2>New Lead Received</h2>
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Phone:</strong> ${lead.phone ?? '—'}</p>
          <p><strong>Message:</strong></p>
          <blockquote>${lead.message}</blockquote>
        `,
      });
    } catch (error) {
      this.logger.error('Failed to send lead notification email', error);
    }
  }

  async sendLeadWelcome(lead: { name: string; email: string }): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.from,
        to: [lead.email],
        subject: `Thanks for reaching out, ${lead.name}!`,
        html: `
          <h2>Hi ${lead.name},</h2>
          <p>Thank you for getting in touch with <strong>Austere-Analytics</strong>.</p>
          <p>We've received your message and a member of our team will get back to you within <strong>1 business day</strong>.</p>
          <p>In the meantime, feel free to explore our work:</p>
          <ul>
            <li><a href="https://austere-analytics.com/portfolio">Our Portfolio</a></li>
            <li><a href="https://austere-analytics.com/blog">Our Blog</a></li>
            <li><a href="https://austere-analytics.com/resources">Free Resources</a></li>
          </ul>
          <p>Or <a href="https://austere-analytics.com/schedule">book a free discovery call</a> directly in our calendar.</p>
          <p>Best,<br/>The Austere-Analytics Team</p>
        `,
      });
    } catch (error) {
      this.logger.error('Failed to send lead welcome email', error);
    }
  }

  // -----------------------------------------------------------------------
  // Resource download confirmation
  // -----------------------------------------------------------------------

  async sendResourceDownloadConfirmation(data: {
    name: string;
    email: string;
    resourceTitle: string;
    fileUrl: string;
  }): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.from,
        to: [data.email],
        subject: `Your download: ${data.resourceTitle}`,
        html: `
          <h2>Hi ${data.name},</h2>
          <p>Here is your download link for <strong>${data.resourceTitle}</strong>:</p>
          <p><a href="${data.fileUrl}" style="background:#4f46e5;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block;">Download Now</a></p>
          <p>The link will remain available. Feel free to bookmark it.</p>
          <hr/>
          <p>While you're here, you might enjoy our other free resources:</p>
          <p><a href="https://austere-analytics.com/resources">Browse all resources →</a></p>
          <p>Best,<br/>The Austere-Analytics Team</p>
        `,
      });
    } catch (error) {
      this.logger.error(
        'Failed to send resource download confirmation email',
        error,
      );
    }
  }

  // -----------------------------------------------------------------------
  // Newsletter welcome
  // -----------------------------------------------------------------------

  async sendNewsletterWelcome(email: string): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.from,
        to: [email],
        subject: 'Welcome to the Austere-Analytics newsletter!',
        html: `
          <h2>Welcome aboard! 🎉</h2>
          <p>You're now subscribed to the <strong>Austere-Analytics</strong> newsletter.</p>
          <p>Expect to hear from us with:</p>
          <ul>
            <li>In-depth articles on web development, AI, and technology</li>
            <li>Free resources and templates</li>
            <li>Project spotlights and case studies</li>
          </ul>
          <p>In the meantime, check out our latest articles: <a href="https://austere-analytics.com/blog">Blog →</a></p>
          <p>Best,<br/>The Austere-Analytics Team</p>
          <hr/>
          <p style="font-size:12px;color:#9ca3af;">
            You're receiving this because you subscribed at austere-analytics.com.
          </p>
        `,
      });
    } catch (error) {
      this.logger.error('Failed to send newsletter welcome email', error);
    }
  }
}

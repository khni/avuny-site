'use server'

import { resend } from '@/config/resend'
import { contactSchema } from '@/features/ContactUs/ContactSchema'

type ContactFormValues = {
  name: string
  email: string
  number?: string
  message: string
}

export async function sendContactEmail(input: unknown) {
  const recieverEmail = process.env.RECEIVER_EMAIL
  if (!recieverEmail) {
    throw new Error('recieverEmail is not defiend')
  }
  const senderEmail = process.env.SENDER_EMAIL
  if (!senderEmail) {
    throw new Error('recieverEmail is not defiend')
  }
  const parsed = contactSchema.safeParse(input)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid form data',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const { name, email, number, message } = parsed.data

  try {
    await resend.emails.send({
      from: senderEmail,
      to: recieverEmail,
      subject: `New contact message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return {
      success: true,
      message: 'Your message has been sent successfully',
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: 'Failed to send email. Please try again later.',
    }
  }
}

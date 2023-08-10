import { BadRequestException, Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config/dist'

@Injectable()
export class EmailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly config: ConfigService
  ) { }

  async sendEmail(emailData: any): Promise<string> {
    const { name, email, message, language, code } = emailData
    const newMessage = emailData["message"]

    if (code !== process.env.CLI_PASSWORD)
      throw new BadRequestException('Password from client is incorrect')

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!emailRegex.test(email))
      throw new BadRequestException('Client password is incorrect')

    let subj = `Thank you for reaching out to me ${name}!`
    let txt = 'I really appreciate your interest in my skills. Briefly, I will be contacting you.'

    if (language === 'es') {
      subj = `¡Gracias por contactarme ${name}!`
      txt = 'Realmente aprecio su interés en mi perfil de habilidades. Estaré comunicándome con usted en breve.'
    }

    const emailMessage = {
      to: email,
      subject: subj,
      template: 'thank-you',
      text: txt,
      context: {
        name,
        language
      }
    }

    const emailNofitication = {
      to: 'cortes.ivan353@gmail.com',
      subject: `Client: ${name}, email: ${email}, asked for a contact`,
      text: `${newMessage}. Language: ${language}`
    }

    await this.mailService.sendMail(emailMessage)
    await this.mailService.sendMail(emailNofitication)

    return 'Email sent'
  }
}
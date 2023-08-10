import { Module } from '@nestjs/common'
import { EmailController } from './email.controller'
import { MailerModule } from '@nestjs-modules/mailer'
import { EmailService } from './email.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
        secure: false,
      },
    })
  ],
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule { }
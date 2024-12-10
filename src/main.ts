import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

    // Configure CORS
    app.enableCors({
        origin: 'http://localhost:3000', // Your Next.js frontend URL
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })

    await app.listen(3001) // Change the port to 3001
}
bootstrap()

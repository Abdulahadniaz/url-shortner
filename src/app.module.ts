import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Url } from './url/url.entity'
import { UrlModule } from './url/url.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get('DATABASE_URL'),
                entities: [Url],
                synchronize: true, // Be cautious with this in production
            }),
            inject: [ConfigService],
        }),
        UrlModule,
    ],
})
export class AppModule {}

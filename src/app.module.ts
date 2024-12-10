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
                type: 'sqlite',
                database: configService.get<string>(
                    'DATABASE_NAME',
                    'URL.sqlite'
                ),
                entities: [Url],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        UrlModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

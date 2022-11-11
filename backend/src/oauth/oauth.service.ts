import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Users } from '../../entity/Users.entity';

@Injectable()
export class OauthService {
    constructor(private jwtService: JwtService, @InjectRepository(Users) private usersRepository: Repository<Users>) {}

    async signWithGoogle(user) {
        if (!user) throw new BadRequestException();

        try {
            console.log('Login User email :  ', user.email);
            const newUser: CreateUserDto = {
                email: user.email,
                nickname: user.nickname,
                photo: user.photos,
                accessToken: user.accessToken,
            };

            const isUser = await this.findUser(newUser);
            console.log(isUser);
            if (!isUser) {
                const returnedUser = await this.register(newUser);
                return await this.login(newUser, returnedUser);
            }

            return await this.login(newUser, isUser);
        } catch (e) {
            throw new Error(e);
        }
    }

    async login(user, newUser) {
        if (!user) throw new BadRequestException();
        console.log('user info', newUser);
        return {
            accessToken: this.jwtService.sign(
                {
                    id: newUser.id,
                },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: process.env.JWT_EXPIRE_TIME,
                },
            ),
            nickname: user.nickname,
            email: user.email,
            photo: user.photo,
        };
    }

    async findUser(user) {
        return await this.usersRepository.findOne({ email: user.email });
    }

    async register(user) {
        const newUser = this.usersRepository.create();
        newUser.nickname = user.nickname;
        newUser.email = user.email;
        newUser.photo = user.photo;
        return await this.usersRepository.save(newUser);
    }
}

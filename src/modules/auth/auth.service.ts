import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.userService.findOne(loginDto);

        const passwordMatched = await bcrypt.compare(
            loginDto.password,
            user.password,
        );

        if (passwordMatched) {
            delete user.password;

            const payload = { email: user.email, sub: user.id };

            return {
                accessToken: this.jwtService.sign(payload),
            };
        } else {
            throw new UnauthorizedException('Password does not match');
        }
    }
}

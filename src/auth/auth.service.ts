import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
// import { User, Bookmark } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signUp(dto: AuthDto) {
    const hash = await argon2.hash(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        password: hash,
      },
    });
    delete user.password;

    return {
      data: user,
    };
  }
  signIn() {
    return { data: 'Signed in success' };
  }
}

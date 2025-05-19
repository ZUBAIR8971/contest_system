import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  private readonly saltRounds = 10;

  /**
   * Hash a plain text password.
   * @param password - The plain text password.
   * @returns A promise that resolves to the hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compare a plain text password with a hashed password.
   * @param plainPassword - The plain text password.
   * @param hashedPassword - The hashed password to compare against.
   * @returns A promise that resolves to true if they match, otherwise false.
   */
  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

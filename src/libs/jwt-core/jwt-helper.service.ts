import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHelperService<T extends Record<string, any>> {
  private readonly logger: Logger = new Logger(JwtHelperService.name);
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Generates a JWT token with the predefined payload type.
   * @param payload The data to encode in the token.
   * @param expiresIn Expiration time for the token (default: '1h').
   * @returns A signed JWT token.
   */
  generateToken(payload: T, expiresIn = '1h'): string {
    return this.jwtService.sign(payload, { expiresIn });
  }

  /**
   * Verifies the JWT token and ensures it returns the correct type.
   * @param token JWT token to verify.
   * @returns Decoded payload if valid.
   */
  verifyToken(token: string): T {
    try {
      return this.jwtService.verify<T>(token);
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        if (error.name === 'TokenExpiredError') throw new BadRequestException('Token has expired');
        if (error.name === 'JsonWebTokenError') throw new BadRequestException('Invalid token');
        throw new BadRequestException('Invalid or expired token');
      }

      this.logger.error('Something went wrong while token verification');
      throw new Error('Something went wrong');
    }
  }
}

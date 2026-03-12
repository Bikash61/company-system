import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<User>;
  let jwtService: JwtService;

  const mockUserModel = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto = { name: 'Test User', email: 'test@example.com', password: 'password' };
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      
      mockUserModel.create.mockResolvedValue({
        ...registerDto,
        password: hashedPassword,
      } as any);

      const result = await authService.register(registerDto);

      expect(result.email).toEqual(registerDto.email);
      expect(bcrypt.compare(registerDto.password, result.password));
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const loginDto = { email: 'test@example.com', password: 'password' };
      const hashedPassword = await bcrypt.hash(loginDto.password, 10);
      const user = { _id: 'someId', email: loginDto.email, password: hashedPassword };
      
      mockUserModel.findOne.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue('someToken');

      const result = await authService.login(loginDto);

      expect(result).toEqual({ token: 'someToken' });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const loginDto = { email: 'test@example.com', password: 'wrongpassword' };
      const hashedPassword = await bcrypt.hash('password', 10);
      const user = { _id: 'someId', email: loginDto.email, password: hashedPassword };

      mockUserModel.findOne.mockResolvedValue(user);

      await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user not found', async () => {
        const loginDto = { email: 'test@example.com', password: 'password' };
  
        mockUserModel.findOne.mockResolvedValue(null);
  
        await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
      });
  });
});

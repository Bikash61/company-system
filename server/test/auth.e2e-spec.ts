import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect } from 'mongoose';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot(uri),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({ name: 'Test User', email: 'test@example.com', password: 'password' })
        .expect(201)
        .then(res => {
          expect(res.body).toHaveProperty('access_token');
        });
    });

    it('should not register a user with a duplicate email', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({ name: 'Test User 2', email: 'test@example.com', password: 'password2' })
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login a user and return a JWT', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'password' })
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty('access_token');
        });
    });

    it('should not login a user with incorrect credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' })
        .expect(401);
    });
  });
});

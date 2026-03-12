import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ProcessTextDto } from './dto/process-text.dto';

describe('AiService', () => {
  let service: AiService;
  let httpService: HttpService;

  const mockHttpService = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processText', () => {
    it('should call the AI service and return the result', async () => {
      const dto: ProcessTextDto = { text: 'Test input' };
      const expectedResult = { processedText: 'TEST INPUT' };
      const response: AxiosResponse<any> = {
        data: expectedResult,
        headers: {},
        config: { url: 'http://127.0.0.1:8000/process-text', headers: undefined as any },
        status: 200,
        statusText: 'OK',
      };

      mockHttpService.post.mockReturnValue(of(response));

      const result = await service.processText(dto);

      expect(httpService.post).toHaveBeenCalledWith('http://127.0.0.1:8000/process-text', dto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if the AI service call fails', async () => {
      const dto: ProcessTextDto = { text: 'Test input' };
      
      mockHttpService.post.mockReturnValue(throwError(() => new Error('AI service error')));

      await expect(service.processText(dto)).rejects.toThrow('Failed to process text with AI service.');
    });
  });
});

import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';

@Controller('proxy/innodata')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('/*') // Catch all requests
  async proxyRequest(@Req() req: Request, @Res() res: Response) {
    const path = req.params[0]; // Get the actual path after /proxy/innodata
    return this.proxyService.forward(path, req, res);
  }
}
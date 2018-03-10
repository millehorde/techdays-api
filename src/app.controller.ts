import { All, Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@Controller()
@ApiUseTags('ALL')
export class AppController {
  @All()
  root(): string {
    return 'TechDays API: 10/03/2018!';
  }
}

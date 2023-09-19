import { Test, TestingModule } from "@nestjs/testing";

import { FormatoVacioService } from "./formato-vacio.service";
import { FormatoVacioController } from "./formato-vacio.controller";

describe("FormatosVaciosController", () => {
  let controller: FormatoVacioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormatoVacioController],
      providers: [FormatoVacioService],
    }).compile();

    controller = module.get<FormatoVacioController>(FormatoVacioController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

import {
  Example,
  CreateExampleDto,
  UpdateExampleDto,
} from "@/model/example.model";
import httpService from "@/services/http.service";

const parseExample = (s: any) => new Example(s.id, s.name, s.example);

const basePath = "examples";

export async function getAllExamples(): Promise<Example[]> {
  let example = await httpService.get(basePath, null, parseExample);
  if (!Array.isArray(example)) {
    example = [example];
  }
  return example;
}

export async function getExampleById(id: string): Promise<Example> {
  const example = await httpService.get(
    `${basePath}/${id}`,
    null,
    parseExample
  );
  return example as Example;
}

export async function postExample(
  _Example: CreateExampleDto
): Promise<Example> {
  const example = await httpService.post(`${basePath}`, _Example);
  return example as Example;
}

export async function deleteExample(id: string): Promise<any> {
  const result = await httpService.del(`${basePath}/${id}`, null, parseExample);
  return result;
}

export async function updateExample(
  _Example: Partial<UpdateExampleDto>,
  id: string
): Promise<Example> {
  const example = await httpService.pat(`${basePath}/${id}`, _Example);
  return example as Example;
}

import { Inject, Injectable } from "@angular/core";
import { ShoppingListRepository, ShoppingListRepositoryErrorCode } from "./shopping-list-repository.interface";
import { HttpClient } from "@angular/common/http";
import { CreateShoppingListParams } from "../interface/create-shopping-list.interface";
import { Result } from "../../toolBox/result/implementations/result";
import { ShpLsPrsrShoppingListAdapter, ShpLsPrsrShoppingListValidator } from "../external-apis/shplsprsr/shplsprsr-shopping-list";

@Injectable({ providedIn: "root" })
export class HttpShoppingListRepository implements ShoppingListRepository {
  constructor(
    @Inject(HttpClient)
    private readonly httpClient: HttpClient
  ) {}

  async create(params: CreateShoppingListParams) {
    const response: string = await new Promise((resolve) => {
      this.httpClient.post("http://localhost:8040/shopping-list", JSON.stringify(params), { responseType: "text"})
        .subscribe(resolve)
    })

    const validator = new ShpLsPrsrShoppingListValidator()
    const validationResult = validator.validate(JSON.parse(response))
    if (validationResult.isErr()) {
      return Result.err({ code: ShoppingListRepositoryErrorCode.VALIDATION_ERROR, error: validationResult.unwrapErr() })
    }

    const rawList = validationResult.unwrap()
    return Result.ok(ShpLsPrsrShoppingListAdapter(rawList))
  }
}
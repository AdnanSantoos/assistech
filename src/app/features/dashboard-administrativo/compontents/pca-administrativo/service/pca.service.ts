import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { ContractPlansRepository } from '../repository/pca.repository';
import { ContractPlanItemModel, ContractPlanModel } from '../model/pca.model';

@Injectable({
  providedIn: 'root',
})
export class ContractPlanService {
  constructor(
    private _repository: ContractPlansRepository,
    private _toastrService: ToastrService,
    private _location: Location
  ) {}

  // public getContractPlans(page: number): Observable<RequisicaoModel<ContractPlanModel[]>> {
  //   return this._repository.getContractPlans(page);
  // }
  public getContractPlans(): Observable<RequisicaoModel<ContractPlanModel[]>> {
    return this._repository.getContractPlans();
  }
  goBack(): void {
    this._location.back();
  }

  createContractPlan(planData: ContractPlanModel): Observable<void> {
    return this._repository.createContractPlan(planData).pipe(
      catchError((error) => {
        this._toastrService.error('Erro ao criar plano de contrato!', 'Erro');
        throw error;
      }),
      switchMap((response) => {
        this._toastrService.success(
          'Plano de contrato criado com sucesso!',
          'Sucesso'
        );
        this.goBack();
        return of(response);
      })
    );
  }

  getContractPlanById(
    contractPlanId: string
  ): Observable<RequisicaoModel<ContractPlanModel>> {
    return this._repository.getContractPlanById(contractPlanId).pipe(
      catchError((error) => {
        this._toastrService.error('Erro ao buscar plano de contrato!', 'Erro');
        throw error;
      })
    );
  }

  deleteContractPlan(
    contractPlanId: string,
    justification: string
  ): Observable<void> {
    return this._repository
      .deleteContractPlan(contractPlanId, justification)
      .pipe(
        catchError((error) => {
          this._toastrService.error(
            'Erro ao excluir plano de contrato!',
            'Erro'
          );
          throw error;
        }),
        switchMap((response) => {
          this._toastrService.success(
            'Plano de contrato excluído com sucesso!',
            'Sucesso'
          );
          this.goBack();
          return of(response);
        })
      );
  }

  createContractPlanItem(
    contractPlanId: string,
    itemData: ContractPlanItemModel
  ): Observable<void> {
    return this._repository
      .createContractPlanItem(contractPlanId, itemData)
      .pipe(
        catchError((error) => {
          this._toastrService.error('Erro ao adicionar item ao plano!', 'Erro');
          throw error;
        }),
        switchMap((response) => {
          this._toastrService.success(
            'Item adicionado com sucesso!',
            'Sucesso'
          );
          return of(response);
        })
      );
  }

  updateContractPlanItem(
    contractPlanId: string,
    itemId: string,
    itemData: ContractPlanItemModel
  ): Observable<void> {
    return this._repository
      .updateContractPlanItem(contractPlanId, itemId, itemData)
      .pipe(
        catchError((error) => {
          this._toastrService.error('Erro ao atualizar item do plano!', 'Erro');
          throw error;
        }),
        switchMap((response) => {
          this._toastrService.success(
            'Item atualizado com sucesso!',
            'Sucesso'
          );
          return of(response);
        })
      );
  }

  deleteContractPlanItem(
    contractPlanId: string,
    itemId: string,
    justification: string
  ): Observable<void> {
    return this._repository
      .deleteContractPlanItem(contractPlanId, itemId, justification)
      .pipe(
        catchError((error) => {
          this._toastrService.error('Erro ao excluir item do plano!', 'Erro');
          throw error;
        }),
        switchMap((response) => {
          this._toastrService.success('Item excluído com sucesso!', 'Sucesso');
          return of(response);
        })
      );
  }
}

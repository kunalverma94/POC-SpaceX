import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFilters } from 'src/app/models/data-filters';
import { GenericFilter } from 'src/app/models/Genericfilters';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public currentFilters: DataFilters = { limit: environment.appsettings.limit };

  public yearFilter: GenericFilter = {
    title: 'Launch Year',
    options: Array.apply(null, { length: 15 })
      .map(Number.call, Number)
      .map((j) => j + 2006),
    key: 'launch_year',
  };

  public successLaunchFilter: GenericFilter = {
    title: 'Successful Launch',
    key: 'launch_success',
    options: ['True', 'False'],
  };

  public successLandFilter: GenericFilter = {
    title: 'Successful Land',
    key: 'land_success',
    options: ['True', 'False'],
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.yearFilter.default = params.launch_year;
      this.successLaunchFilter.default = params.launch_success;
      this.successLandFilter.default = params.land_success;
      this.currentFilters = { ...this.currentFilters, ...params };
    });
  }

  public filterURLBuilder(): string {
    const urlBuilder = [];
    console.log(this.currentFilters);
    Object.keys(this.currentFilters).forEach((p) => {
      if (this.currentFilters[p] !== undefined) {
        urlBuilder.push(`${p}=${this.currentFilters[p]}`);
      }
    });
    return urlBuilder.join('&').toLowerCase();
  }

  public setFilters(dataFilters: DataFilters) {
    if (dataFilters) {
      this.currentFilters = { ...this.currentFilters, ...dataFilters };
      console.log(this.currentFilters);
      this.router.navigate(['home'], {
        queryParams: this.currentFilters,
      });
    }
  }
}

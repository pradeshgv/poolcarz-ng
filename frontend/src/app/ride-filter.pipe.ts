import { Pipe, PipeTransform } from '@angular/core';
import { Login } from './login/login';

@Pipe({
  name: 'rideFilter'
})
export class RideFilterPipe implements PipeTransform {

  transform(value: any[], args?: string): any[] {
    if(args=="sar")
    {
      return value;
    }
    if(args=="to")
    {
      return value.filter(v=>v.destination=="Office");
    }
    if(args=="fo")
    {
      return value.filter(v=>v.pickUp=="Office");
    }
    if(args=="ot")
    {
      return value.filter(v=>v.pickUp!="Office"&&v.destination!="Office");
    }
    return value;
  }

}

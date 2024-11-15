import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

// import { AuthenticationService } from '@app/_services';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private storageService: StorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.storageService.getUser();
        if (user) {
            // check if route is restricted by role
            const { roles } = route.data;
            const { title } = route.data;
            const usertasks = user.task.split(',');
            if (roles && !roles.includes(user.roleName)) {
                // role not authorized so redirect to home page
                this.router.navigate(['/dashboard']);
                Swal.fire({
                    title: 'Access Denied',
                    text: 'You Don\'t have access for ' + title,
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#11cdef'
                  });
                return false;
            }

            // authorized so return true
                return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    canTaskEnable(task: string){
        const user = this.storageService.getUser();
        if (user) {
            let usertasks = user.task.split(',');
            usertasks = usertasks.map(task => task.trim());
            task = task.trim();
            if (usertasks && !usertasks.includes(task)) {
                // role not authorized so redirect to home page
                return false;
            }
            
            // authorized so return true
                return true;
        }

        // not logged in so redirect to login page with the return url
        return false;
    }
}
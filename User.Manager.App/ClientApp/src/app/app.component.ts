import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    /**
     * Removes pre-app loader.
     * 
     * {@inheritdoc}
     */
    public ngOnInit(): void
    {
        const loader = document.querySelector('#loader');

        if (loader)
        {
            loader.animate([
                { display: 'flex', opacity: '1' },
                { display: 'flex', opacity: '0' },
                { display: 'none', opacity: '0' }
            ] as any, {
                duration: 1000,
                easing: 'ease-out',
            }).onfinish = () => {
                loader.remove();
            };
        }

        return;
    }
}

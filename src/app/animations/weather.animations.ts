import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

// Weather data fade in/out animation
export const weatherFadeAnimation = trigger('weatherFade', [
  state('void', style({
    opacity: 0,
    transform: 'translateY(20px)'
  })),
  state('*', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  transition('void => *', [
    animate('400ms ease-out')
  ]),
  transition('* => void', [
    animate('300ms ease-in')
  ])
]);

// Card slide in animation
export const cardSlideAnimation = trigger('cardSlide', [
  state('void', style({
    opacity: 0,
    transform: 'translateX(-30px)'
  })),
  state('*', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [
    animate('500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
  ]),
  transition('* => void', [
    animate('300ms ease-in')
  ])
]);

// Loading spinner animation
export const loadingAnimation = trigger('loadingSpin', [
  state('loading', style({
    transform: 'rotate(0deg)'
  })),
  state('loaded', style({
    transform: 'rotate(360deg)'
  })),
  transition('loading => loaded', [
    animate('600ms ease-in-out')
  ])
]);

// History item stagger animation
export const historyStaggerAnimation = trigger('historyStagger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(100, [
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

// Search suggestions animation
export const searchSuggestionsAnimation = trigger('searchSuggestions', [
  state('void', style({
    opacity: 0,
    transform: 'translateY(-10px)',
    maxHeight: '0px'
  })),
  state('*', style({
    opacity: 1,
    transform: 'translateY(0)',
    maxHeight: '200px'
  })),
  transition('void => *', [
    animate('300ms ease-out')
  ]),
  transition('* => void', [
    animate('200ms ease-in')
  ])
]);

// Weather icon pulse animation
export const weatherIconAnimation = trigger('weatherIcon', [
  state('void', style({
    transform: 'scale(0.8)',
    opacity: 0
  })),
  state('*', style({
    transform: 'scale(1)',
    opacity: 1
  })),
  transition('void => *', [
    animate('600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)')
  ])
]);

// Temperature change animation
export const temperatureAnimation = trigger('temperatureChange', [
  state('old', style({
    opacity: 0,
    transform: 'scale(0.9)'
  })),
  state('new', style({
    opacity: 1,
    transform: 'scale(1)'
  })),
  transition('old => new', [
    animate('400ms ease-out')
  ])
]);

// Error message slide animation
export const errorSlideAnimation = trigger('errorSlide', [
  state('void', style({
    opacity: 0,
    transform: 'translateX(100%)'
  })),
  state('*', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [
    animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
  ]),
  transition('* => void', [
    animate('300ms ease-in')
  ])
]);

// Grid tile animations
export const gridTileAnimation = trigger('gridTile', [
  state('void', style({
    opacity: 0,
    transform: 'scale(0.9) rotateY(10deg)'
  })),
  state('*', style({
    opacity: 1,
    transform: 'scale(1) rotateY(0deg)'
  })),
  transition('void => *', [
    animate('600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
  ])
]);

// Success message animation
export const successAnimation = trigger('successMessage', [
  state('void', style({
    opacity: 0,
    transform: 'translateY(-20px) scale(0.9)'
  })),
  state('*', style({
    opacity: 1,
    transform: 'translateY(0) scale(1)'
  })),
  transition('void => *', [
    animate('500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)')
  ])
]); 
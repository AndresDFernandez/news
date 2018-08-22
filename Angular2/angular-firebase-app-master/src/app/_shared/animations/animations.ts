import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition('void => *', [
    style({opacity: 0}), // style only for transition transition (after transiton it removes)
    animate(500, style({opacity: 1})) // the new state of the transition(after transiton it removes)
  ]),
  transition('* => void', [
    animate(500, style({opacity: 0})) // the new state of the transition(after transiton it removes)
  ])
]);


export const curtainEffec = trigger('curtainEffec', [
  transition('void => *', [
    style({
      height: 0,
      overflow: 'hidden'
    }),
    animate(320)
  ]),
  transition('* => void', [
    animate(320, style({
      display: 'block',
      height: '0',
      overflow: 'hidden'
    }))
  ])
]);

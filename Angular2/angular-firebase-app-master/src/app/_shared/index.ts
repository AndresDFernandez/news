import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components
import { TabComponent } from './component/tab/tab.component';
import { TabPanelComponent } from './component/tab-panel/tab-panel.component';
import { SelectComponent } from './component/select/select.component';
import { InputComponent } from './component/input/input.component';
import { TwoLinesInputComponent } from './component/two-lines-input.component.ts/two-lines-input.component';
import { MinusPlusComponent } from './component/minus-plus/minus-plus.component';
import { SwitchSliderComponent } from './component/switch-slider/switch-slider.component';
import { SelectDatePickerComponent } from './component/select-date-picker/select-date-picker.component';
import { ItineraryComponent } from './component/itinerary/itinerary.component';
import { PrefixPhoneComponent } from './component/prefix-phone/prefix-phone.component';
import { FlightPaymentDetailComponent } from './component/flight-payment-detail/flight-payment-detail.component';
import { TypeFareComponent } from './component/type-fare/type-fare.component';
import { ScriptLoaderComponent } from './component/script-loader/script-loader.component';

// Directives
import { ClickOutsideDirective } from './directives/click-outside';
import { GroupRadioComponent } from './component/group-radio/group-radio.component';
import { ModalModule } from './component/modal/modalModule';
import { SegmentSelectorComponent } from './component/segment-selector/segment-selector.component';
import { AncillarySelectorComponent } from './component/ancillary-selector/ancillary-selector.component';


export const SHARED_COMPONENTS = [
    TabComponent,
    TabPanelComponent,
    SelectComponent,
    InputComponent,
    TwoLinesInputComponent,
    MinusPlusComponent,
    SwitchSliderComponent,
    SelectDatePickerComponent,
    ItineraryComponent,
    FlightPaymentDetailComponent,
    TypeFareComponent,
    PrefixPhoneComponent,
    GroupRadioComponent,
    AncillarySelectorComponent,
    SegmentSelectorComponent,
    ScriptLoaderComponent
];

export const SHARED_DIRECTIVES = [
    ClickOutsideDirective
];

export const SHARED_MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
];


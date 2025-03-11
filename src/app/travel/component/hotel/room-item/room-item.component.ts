import { ButtonModule } from 'primeng/button';
import { Component, EventEmitter, Output } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-room-item',
    imports: [ImageModule, ButtonModule],
    templateUrl: './room-item.component.html',
    styleUrl: './room-item.component.scss',
    standalone: true
})
export class RoomItemComponent {
    @Output() roomSelected = new EventEmitter<any>();

    selectRoom(room: any) {
        room.selected = !room.selected;
        this.roomSelected.emit(room);
    }
}

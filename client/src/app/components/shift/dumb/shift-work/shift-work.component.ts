import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IShiftWork } from '../../../../models/shift';
import { Tracks } from '../../../../models/track';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shift-work',
  templateUrl: './shift-work.component.html',
  styleUrls: ['./shift-work.component.scss']
})
export class ShiftWorkComponent implements OnInit {
  @Input() header: string;
  @Input() crane: number;
  @Input() works: IShiftWork[];
  @Output() worksChange: EventEmitter<IShiftWork[]> = new EventEmitter<IShiftWork[]>();

  tracks = Tracks;
  form: FormArray;

  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.buildForm();
    this.bindForm();
  }

  removeWork(index: number) {
    this.form.removeAt(index);
  }

  trackIsBusy(track: string): boolean {
    return !!this.form.controls.find(group => group.value.track === track);
  }

  private buildForm() {
    const emptyWorkGroup = {
      track: '',
      loaded: null,
      unloaded: null,
    };

    const systemWorkFormGroup = this.createWorkGroup(emptyWorkGroup, true);

    this.form = this.formBuilder.array([systemWorkFormGroup]);

    systemWorkFormGroup.get('track').valueChanges.subscribe((value) => {
      if (value) {
        systemWorkFormGroup.updateValueAndValidity();
        this.form.insert(this.form.length - 1, this.createWorkGroup(systemWorkFormGroup.value));
        systemWorkFormGroup.patchValue(emptyWorkGroup);
        this.cdRef.detectChanges();
      }
    });

    this.form.valueChanges.subscribe(value => {
      const noSystemWorkGroups = value.filter(workGroup => !workGroup.system);
      const shiftWorks: IShiftWork[] = noSystemWorkGroups.map(workGroup => {
        return {
          crane: this.crane,
          track: workGroup.track,
          loaded: workGroup.loaded,
          unloaded: workGroup.unloaded,
        };
      });

      this.worksChange.emit(shiftWorks);
    });
  }

  private bindForm() {
    for (const work of this.works) {
      this.form.insert(this.form.length - 1, this.createWorkGroup(work));
    }
  }

  private createWorkGroup(work, system: boolean = false) {
    return this.formBuilder.group({
      track:  work.track,
      loaded: work.loaded,
      unloaded: work.unloaded,
      system: [system]
    });
  }
}

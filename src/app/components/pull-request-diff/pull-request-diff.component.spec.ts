import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullRequestDiffComponent } from './pull-request-diff.component';

describe('PullRequestDiffComponent', () => {
  let component: PullRequestDiffComponent;
  let fixture: ComponentFixture<PullRequestDiffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PullRequestDiffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PullRequestDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

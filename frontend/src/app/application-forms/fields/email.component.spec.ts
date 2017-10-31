import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailComponent } from './email.component';
import { alphanumericValidator } from '../validators/alphanumeric-validation';

describe('Email Component', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;
  let formBuilder: FormBuilder;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [EmailComponent],
        providers: [FormBuilder],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    formBuilder = new FormBuilder();
    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.debugElement.componentInstance;
    component.applicantInfo = formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email, alphanumericValidator()]]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid', () => {
    const field = component.applicantInfo.controls.emailAddress;
    field.markAsTouched();
    expect(field.valid).toBeFalsy();
    field.setValue('test');
    expect(field.valid).toBeFalsy();
    field.setValue('test@test.com');
    expect(field.valid).toBeTruthy();
  });
});

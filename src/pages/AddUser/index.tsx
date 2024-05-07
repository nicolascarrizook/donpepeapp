import Lucide from "@/components/Base/Lucide";
import users from "@/fakers/users";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";
import { FormInput, FormSelect, FormCheck } from "@/components/Base/Form";
import { useRef, useState } from "react";
import clsx from "clsx";
import _ from "lodash";
import { useEmployeeStore } from '@/stores/employes';
import Notification, { NotificationElement } from '@/components/Base/Notification';

function Main() {
  const [ dateOfBirth, setDateOfBirth ] = useState<string>();
  const { setEmployee, saveEmployee, employee } = useEmployeeStore();
  const [showNotification, setShowNotification] = useState(false);
  const [formError, setFormError] = useState<string>('');

  const handleInputChange = ( field: string, value: string ) => {
    setEmployee( { [ field ]: value } );
  };

  const successNotification = useRef<NotificationElement>();

  const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    if (!employee.fullName || !employee.email || !dateOfBirth || !employee.gender || !employee.phoneNumber) {
      setFormError('Todos los campos marcados como requeridos deben ser llenados.');
      return;  
    }
    setFormError('');  
    try {
      await saveEmployee();
      setShowNotification(true);
      setTimeout(() => {
        successNotification.current?.showToast();
      }, 500);
      setEmployee({
        fullName: '',
        dateOfBirth: undefined,
        email: '',
        gender: 'male',
        phoneNumber: '',
      });
    } catch (error) {
      console.log('Error: ', error);
      setFormError('Ocurrió un error al guardar la información del empleado.');
    }
  };

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      {showNotification && (
        <Notification getRef={(el) => {
            successNotification.current = el;
          }}
          className="flex"
        >
          <Lucide icon="CheckCircle" className="text-success" />
          <div className="ml-4 mr-4">
            <div className="font-medium">Empleado registrado con éxito!</div>
            <div className="mt-1 text-slate-500">
              Su información ha sido guardada correctamente.
            </div>
          </div>
        </Notification>
      )}
      <div className="col-span-12 sm:col-span-10 sm:col-start-2">
        <div className="flex flex-col lg:items-center lg:flex-row gap-y-2">
          <div
            className={ clsx( [
              "flex items-center lg:justify-center flex-1 lg:first:justify-start lg:last:justify-end group active",
              "after:hidden before:hidden after:lg:block before:lg:block",
              "first:after:content-[''] first:after:w-full first:after:bg-slate-300/60 first:after:h-[2px] first:after:ml-5 group-[.mode--light]:first:after:bg-slate-300/20",
              "last:before:content-[''] last:before:w-full last:before:bg-slate-300/60 last:before:h-[2px] last:before:mr-5 group-[.mode--light]:last:before:bg-slate-300/20",
              "last:after:hidden after:content-[''] after:w-full after:bg-slate-300/60 after:h-[2px] after:ml-5 group-[.mode--light]:after:bg-slate-300/20",
              "first:before:hidden before:content-[''] before:w-full before:bg-slate-300/60 before:h-[2px] before:mr-5 group-[.mode--light]:before:bg-slate-300/20",
            ] ) }
          >
            <div className="flex items-center">
              <div className="ml-3.5 group-[.mode--light]:!text-slate-300 font-medium whitespace-nowrap text-slate-500 group-[.active]:text-current [.group.mode--light_.group.active_&]:!text-slate-100">
                Información Básica del empleado
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7"> 
          <form className="flex flex-col box box--stacked" onSubmit={handleSubmit}>
            <div className="p-7">
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Foto del empleado</div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Sube una foto de perfil de tu empleado.
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <div className="flex items-center">
                    <div className="relative flex items-center justify-center w-24 h-24 border rounded-full bg-primary/5 border-primary/10">
                      <Lucide
                        icon="User"
                        className="w-[65%] h-[65%] fill-slate-300/70 -mt-1.5 stroke-[0.5] stroke-slate-400/50"
                      />
                      <a
                        href=""
                        className="absolute bottom-0 right-0 flex items-center justify-center rounded-full box w-7 h-7"
                      >
                        <Lucide
                          icon="Pencil"
                          className="w-3.5 h-3.5 stroke-[1.3] text-slate-500"
                        />
                      </a>
                    </div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="pl-3.5 pr-4 mr-2 h-8 ml-8"
                    >
                      <Lucide
                        icon="Trash2"
                        className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                      />{ " " }
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Nombre completo</div>
                      <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                        Requerido
                      </div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Proporcione el nombre completo de su empleado.
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <div className="flex flex-col items-center md:flex-row">
                    <FormInput
                      type="text"
                      className="first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10"
                      placeholder="Nombre"
                      value={ employee.fullName }
                      onChange={ ( e ) => handleInputChange( 'fullName', e.target.value ) }
                    />
                    
                  </div>
                  {
                      formError && (
                        <div className="text-xs text-danger m-4">{formError}</div>
                      )
                    }
                </div>
              </div>
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Fecha de cumpleaños</div>
                      <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                        Requerido
                      </div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Proporcione la fecha de nacimiento de su empleado.
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <Litepicker
                    value={ dateOfBirth }
                    onChange={ ( e ) => {
                      setDateOfBirth( e.target.value );
                    } }
                    options={ {
                      autoApply: false,
                      dropdowns: {
                        minYear: 1990,
                        maxYear: null,
                        months: true,
                        years: true,
                      },
                    } }
                  />
                   {
                      formError && (
                        <div className="text-xs text-danger m-4">{formError}</div>
                      )
                    }
                </div>
              </div>
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">
                        Género
                      </div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Seleccione el género de su empleado.
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <div className="flex flex-col items-center md:flex-row">
                    <div className="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                      <FormCheck>
                        <FormCheck.Input
                          id="checkbox-switch-1"
                          type="radio"
                          name="gender"
                          value="Masculino"
                          checked={ employee.gender === 'Masculino' }
                          onChange={ ( e ) => handleInputChange( 'gender', e.target.value ) }
                        />
                        <FormCheck.Label htmlFor="checkbox-switch-1">Masculino</FormCheck.Label>
                      </FormCheck>
                    </div>
                    <div className="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                      <FormCheck>
                        <FormCheck.Input
                          id="checkbox-switch-2"
                          type="radio"
                          name="gender"
                          value="Femenino"
                          checked={ employee.gender === 'Femenino' }
                          onChange={ ( e ) => handleInputChange( 'gender', e.target.value ) }
                        />
                        <FormCheck.Label htmlFor="checkbox-switch-2">Femenino</FormCheck.Label>
                      </FormCheck>
                    </div>
                    <div className="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                      <FormCheck>
                        <FormCheck.Input
                          id="checkbox-switch-3"
                          type="radio"
                          name="gender"
                          value="Otro"
                          checked={ employee.gender === 'Otro' }
                          onChange={ ( e ) => handleInputChange( 'gender', e.target.value ) }
                        />
                        <FormCheck.Label htmlFor="checkbox-switch-3">Otro</FormCheck.Label>
                      </FormCheck>
                    </div>
                  </div>
                  {
                      formError && (
                        <div className="text-xs text-danger m-4">{formError}</div>
                      )
                    }
                </div>
              </div>
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Email</div>
                      <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                        Requerido
                      </div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Proporcione una dirección de correo electrónico válida.
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <FormInput
                    type="email"
                    placeholder="Email"
                    value={ employee.email }
                    onChange={ ( e ) => handleInputChange( 'email', e.target.value ) }
                  />
                  {
                      formError && (
                        <div className="text-xs text-danger m-4">{formError}</div>
                      )
                    }
                </div>
              </div>
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Número de teléfono</div>
                      <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                        Requerido
                      </div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Proporcione un número de teléfono válido.
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <div className="flex flex-col items-center md:flex-row">
                    <FormInput
                      type="text"
                      placeholder="Número de teléfono"
                      value={ employee.phoneNumber }
                      onChange={ ( e ) => handleInputChange( 'phoneNumber', e.target.value ) }
                      className="..."
                    />
                    <FormSelect
                      value={ employee.phoneType }
                      onChange={ ( e ) => handleInputChange( 'phoneType', e.target.value ) }
                      className="..."
                    >
                      <option value="office">Personal</option>
                      <option value="home">Casa</option>
                    </FormSelect>
                  </div>
                  <a
                    className="flex items-center mt-3.5 -mb-1 font-medium text-primary"
                    href=""
                  >
                    <Lucide className="w-4 h-4 stroke-[1.3] mr-1" icon="Plus" />
                    Agregar teléfono
                  </a>
                </div>
              </div>
            </div>
            <div className="flex py-5 border-t md:justify-end px-7 border-slate-200/80">
              <Button
                variant="outline-primary"
                className="w-full px-10 md:w-auto border-primary/50"
                type="submit"
              >
                <Lucide
                  icon="Pocket"
                  className="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                />
                Registrar empleado
              </Button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Main;

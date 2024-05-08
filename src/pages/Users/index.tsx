import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import { FormCheck, FormInput } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";
import clsx from "clsx";
import _ from "lodash";
import { useEmployeeStore } from '@/stores/employes';
import { useEffect } from 'react';

function Main() {
  const { employees, loadEmployees } = useEmployeeStore();

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            MI PERSONAL
          </div>
        </div>
        <div className="flex flex-col gap-8 mt-3.5">
          <div className="flex flex-col p-5 box box--stacked">
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
                <div className="text-base text-slate-500">Emplados registrados</div>
                <div className="mt-1.5 text-2xl font-medium">
                  {employees.length}
                </div>
              </div>
              <div className="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
                <div className="text-base text-slate-500">Empleados activos</div>
                <div className="mt-1.5 text-2xl font-medium">
                  {_.filter(employees, { status: 'activo' }).length}
                 
                </div>
              </div>
              <div className="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
                <div className="text-base text-slate-500">Nuevos empleados</div>
                <div className="mt-1.5 text-2xl font-mediumm">
                  {_.filter(employees, { status: 'nuevo' }).length}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col box box--stacked">
            <div className="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
              <div>
                <div className="relative">
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                  />
                  <FormInput
                    type="text"
                    placeholder="Search users..."
                    className="pl-9 sm:w-64 rounded-[0.5rem]"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
                <Menu>
                  <Menu.Button
                    as={Button}
                    variant="outline-secondary"
                    className="w-full sm:w-auto"
                  >
                    <Lucide
                      icon="Download"
                      className="stroke-[1.3] w-4 h-4 mr-2"
                    />
                    Export
                    <Lucide
                      icon="ChevronDown"
                      className="stroke-[1.3] w-4 h-4 ml-2"
                    />
                  </Menu.Button>
                  <Menu.Items className="w-40">
                    <Menu.Item>
                      <Lucide icon="FileBarChart" className="w-4 h-4 mr-2" />{" "}
                      PDF
                    </Menu.Item>
                    <Menu.Item>
                      <Lucide icon="FileBarChart" className="w-4 h-4 mr-2" />
                      CSV
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
            <div className="overflow-auto xl:overflow-visible">
              <Table className="border-b border-slate-200/60">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Td className="w-5 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                      <FormCheck.Input type="checkbox" />
                    </Table.Td>
                    <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                      Nombre
                    </Table.Td>
                    <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                      Posición
                    </Table.Td>
                    <Table.Td className="py-4 font-medium border-t w-52 bg-slate-50 border-slate-200/60 text-slate-500">
                      Perfil completo
                    </Table.Td>
                    <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
                      Estado
                    </Table.Td>
                    <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                      Fecha de ingreso
                    </Table.Td>
                    <Table.Td className="w-20 py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
                      Acción
                    </Table.Td>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {employees.map((emp, index) => (
                    <Table.Tr key={index} className="[&_td]:last:border-b-0">
                      <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                        <FormCheck.Input type="checkbox" />
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed w-80 dark:bg-darkmode-600">
                        <div className="flex items-center">
                          <div className="ml-3.5">
                            <a
                              href=""
                              className="font-medium whitespace-nowrap"
                            >
                              {emp.fullName}
                            </a>
                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                              {emp.email}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                        <a href="" className="font-medium whitespace-nowrap">
                          {emp.department}
                        </a>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                        </div>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                        <div className="w-40">
                          <div className="text-xs text-slate-500">
                            {_.random(50, 100)}%
                          </div>
                          <div className="flex h-1 border rounded-sm bg-slate-50 mt-1.5">
                            <div
                              className={clsx([
                                "first:rounded-l-sm last:rounded-r-sm border border-primary/20 -m-px bg-primary/40",
                                [
                                  "w-[35%]",
                                  "w-[45%]",
                                  "w-[55%]",
                                  "w-[65%]",
                                  "w-[75%]",
                                ][_.random(0, 4)],
                              ])}
                            ></div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                        <div
                          className={clsx([
                            "flex items-center justify-center",
                            emp.status === 'activo'
                              ? "text-green-500"
                              : "text-danger",
                          ])}
                        >
                          <Lucide
                            icon="Database"
                            className="w-3.5 h-3.5 stroke-[1.7]"
                          />
                          <div className="ml-1.5 whitespace-nowrap">
                            {emp.status === 'activo' ? 'Activo' : 'Inactivo'}
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                        <div className="whitespace-nowrap">
                          {emp.dateOfBirth}
                        </div>
                      </Table.Td>
                      <Table.Td className="relative py-4 border-dashed dark:bg-darkmode-600">
                        <div className="flex items-center justify-center">
                          <Menu className="h-5">
                            <Menu.Button className="w-5 h-5 text-slate-500">
                              <Lucide
                                icon="MoreVertical"
                                className="w-5 h-5 stroke-slate-400/70 fill-slate-400/70"
                              />
                            </Menu.Button>
                            <Menu.Items className="w-40">
                              <Menu.Item>
                                <Lucide
                                  icon="CheckSquare"
                                  className="w-4 h-4 mr-2"
                                />{" "}
                                Edit
                              </Menu.Item>
                              <Menu.Item className="text-danger">
                                <Lucide
                                  icon="Trash2"
                                  className="w-4 h-4 mr-2"
                                />
                                Delete
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

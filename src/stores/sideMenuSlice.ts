import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "@/components/Base/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  badge?: number;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | string>;
}

const initialState: SideMenuState = {
  menu: [
    "DASHBOARDS",
    {
      icon: "MousePointerSquare",
      pathname: "/",
      title: "Estadisticas Generales",
    },
    "GESTIÓN DE PERSONAL",
    {
      icon: "SquareUser",
      pathname: "/users",
      title: "Empleados",
    },
    {
      icon: "PackagePlus",
      pathname: "/add-user",
      title: "Agregar empleado",
    },
    "PRODUCTOS",
    {
      icon: "Package",
      pathname: "/product-grid",
      title: "Productos",
    },
    {
      icon: "PackagePlus",
      pathname: "/add-product",
      title: "Agregar producto",
    },
    "ORDENES",
    {
      icon: "Ticket",
      pathname: "/orders",
      title: "Ordenes",
    },
    "COMPONENTS",
    {
      icon: "LayoutPanelLeft",
      title: "Table",
      subMenu: [
        {
          icon: "FlipVertical",
          pathname: "/regular-table",
          title: "Regular Table",
        },
        {
          icon: "FlipHorizontal",
          pathname: "/tabulator",
          title: "Tabulator",
        },
      ],
    },
    {
      icon: "MemoryStick",
      title: "Overlay",
      subMenu: [
        {
          icon: "MenuSquare",
          pathname: "/modal",
          title: "Modal",
        },
        {
          icon: "Newspaper",
          pathname: "/slideover",
          title: "Slide Over",
        },
        {
          icon: "PanelBottom",
          pathname: "/notification",
          title: "Notification",
        },
      ],
    },
    {
      icon: "Package2",
      pathname: "/tab",
      title: "Tab",
    },
    {
      icon: "Pocket",
      pathname: "/accordion",
      title: "Accordion",
    },
    {
      icon: "PlusSquare",
      pathname: "/button",
      title: "Button",
    },
    {
      icon: "Presentation",
      pathname: "/alert",
      title: "Alert",
    },
    {
      icon: "ShieldEllipsis",
      pathname: "/progress-bar",
      title: "Progress Bar",
    },
    {
      icon: "Clapperboard",
      pathname: "/tooltip",
      title: "Tooltip",
    },
    {
      icon: "FlipVertical",
      pathname: "/dropdown",
      title: "Dropdown",
    },
    {
      icon: "FileType2",
      pathname: "/typography",
      title: "Typography",
    },
    {
      icon: "Aperture",
      pathname: "/icon",
      title: "Icon",
    },
    {
      icon: "Droplets",
      pathname: "/loading-icon",
      title: "Loading Icon",
    },
    {
      icon: "GalleryHorizontalEnd",
      pathname: "/regular-form",
      title: "Regular Form",
    },
    {
      icon: "Microwave",
      pathname: "/datepicker",
      title: "Datepicker",
    },
    {
      icon: "Disc3",
      pathname: "/tom-select",
      title: "Tom Select",
    },
    {
      icon: "Sandwich",
      pathname: "/file-upload",
      title: "File Upload",
    },
    {
      icon: "HopOff",
      pathname: "/wysiwyg-editor",
      title: "Wysiwyg Editor",
    },
    {
      icon: "ClipboardType",
      pathname: "/validation",
      title: "Validation",
    },
    {
      icon: "PieChart",
      pathname: "/chart",
      title: "Chart",
    },
    {
      icon: "KanbanSquare",
      pathname: "/slider",
      title: "Slider",
    },
    {
      icon: "Image",
      pathname: "/image-zoom",
      title: "Image Zoom",
    },
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;

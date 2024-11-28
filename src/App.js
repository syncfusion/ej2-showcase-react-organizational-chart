import './App.css';
import * as React from "react";
import { DiagramComponent, OverviewComponent, SelectorConstraints, PrintAndExport, NodeConstraints, SnapConstraints, ConnectorConstraints, StackPanel, TextElement, PathElement, ImageElement, HierarchicalTree, DataBinding, Inject, Diagram } from "@syncfusion/ej2-react-diagrams";
import { DataManager } from "@syncfusion/ej2-data";
import { DiagramClientSideEvents } from "./events";
import { UtilityMethods } from "./utilityMethods";
import { DropDownButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { DropDownListComponent, MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { createElement, closest, formatUnit } from "@syncfusion/ej2-base";
import { UploaderComponent, ColorPickerComponent, NumericTextBoxComponent, SliderComponent } from "@syncfusion/ej2-react-inputs";
import "./styles/DiagramBuilder/style.css";
import "./styles/index.css";
import "./styles/db_style/diagramBuilder.css";
import "./index.css";
import { ToolbarComponent, ItemsDirective, ItemDirective, ContextMenuComponent, MenuComponent } from '@syncfusion/ej2-react-navigations';
export let diagramName;
export let toolbarEditor;
export let diagramInstance;
export let menuClick;
export let uploadChange;
export let fontSize;
export let tooledit;
export let hSpacing;
export let vSpacing;
export let insertOrRemovePicture;
export let modifyNodeTemplate;
Diagram.Inject(PrintAndExport);
// Data source for the layout.
let data = [
  {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": "parent", "Name": "Maria Anders", "Designation": "Managing Director",
    "IsExpand": "true", "RatingColor": "#C34444", "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image30.png', "EmployeeID": 'SYNC1001', "Team": "TypeScript", "EmailId": 'maria.anders@gmail.com', "PhoneNumber": '0324 - 1819301'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 1, "Name": "Ana Trujillo", "Designation": "Project Manager",
    "IsExpand": "false",
    "RatingColor": "#68C2DE", "ReportingPerson": "parent", "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image2.png', "EmployeeID": 'SYNC1002', "Team": "Java", "EmailId": 'ana.truj@gmail.com', "PhoneNumber": '0324 - 1819302'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 2, "Name": "Anto Moreno", "Designation": "Project Lead",
    "IsExpand": "false",
    "RatingColor": "#93B85A", "ReportingPerson": 1, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image1.png', "EmployeeID": 'SYNC1003', "Team": "Windows", "EmailId": 'ana.moreno@gmail.com', "PhoneNumber": '0324 - 1819303'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 3, "Name": "Thomas Hardy", "Designation": "Senior S/w Engg",
    "IsExpand": "false",
    "RatingColor": "#68C2DE", "ReportingPerson": 2, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image3.png', "EmployeeID": 'SYNC1004', "Team": "UX", "EmailId": 'thomos.hardy@gmail.com', "PhoneNumber": '0324 - 1819304'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 4, "Name": "Christina kaff", "Designation": "S/w Engg",
    "IsExpand": "false",
    "RatingColor": "#93B85A", "ReportingPerson": 3, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image4.png', "EmployeeID": 'SYNC1005', "Team": "UX", "EmailId": 'chris.kaff@gmail.com', "PhoneNumber": '0324 - 1819305'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 5, "Name": "Hanna Moos", "Designation": "Project Trainee",
    "IsExpand": "true",
    "RatingColor": "#D46E89", "ReportingPerson": 4, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image6.png', "EmployeeID": 'SYNC1006', "Team": "Windows", "EmailId": 'hanna.moos@gmail.com', "PhoneNumber": '0324 - 1819306'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 6, "Name": "Peter Citeaux", "Designation": "S/w Engg",
    "IsExpand": "true",
    "RatingColor": "#68C2DE", "ReportingPerson": 5, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image5.png', "EmployeeID": 'SYNC1007', "Team": "Java", "EmailId": 'peter.cite@gmail.com', "PhoneNumber": '0324 - 1819307'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 7, "Name": "Martín Kloss", "Designation": "Project Trainee",
    "IsExpand": "false",
    "RatingColor": "#93B85A", "ReportingPerson": 6, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image18.png', "EmployeeID": 'SYNC1008', "Team": "UX", "EmailId": 'martin.kloss@gmail.com', "PhoneNumber": '0324 - 1819308'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 8, "Name": "Elizabeth Mary", "Designation": "Project Trainee",
    "IsExpand": "None",
    "RatingColor": "#93B85A", "ReportingPerson": 6, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image7.png', "EmployeeID": 'SYNC1009', "Team": "Java", "EmailId": 'elizabeth.marys@gmail.com', "PhoneNumber": '0324 - 1819309'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 9, "Name": "Victoria Ash", "Designation": "Senior S/w Engg",
    "IsExpand": "None",
    "RatingColor": "#D46E89", "ReportingPerson": 5, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image8.png', "EmployeeID": 'SYNC1010', "Team": "React", "EmailId": 'victoria.ash@gmail.com', "PhoneNumber": '0324 - 1819310'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 10, "Name": "Francisco Yang", "Designation": "Senior S/w Engg",
    "IsExpand": "None",
    "RatingColor": "#93B85A", "ReportingPerson": 3, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image19.png', "EmployeeID": 'SYNC1011', "Team": "Java", "EmailId": 'francisco.yang@gmail.com', "PhoneNumber": '0324 - 1819311'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 17, "Name": "Ann Devon", "Designation": "Project Manager",
    "IsExpand": "false",
    "RatingColor": "#68C2DE", "ReportingPerson": 25, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image21.png', "EmployeeID": 'SYNC1012', "Team": "UX", "EmailId": 'Ann.devon@gmail.com', "PhoneNumber": '0324 - 1819312'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 18, "Name": "Roland Mendel", "Designation": "Project Lead",
    "IsExpand": "true",
    "RatingColor": "#68C2DE", "ReportingPerson": 17, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image9.png', "EmployeeID": 'SYNC1013', "Team": "UX", "EmailId": 'roland.mendel@gmail.com', "PhoneNumber": '0324 - 1819313'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 19, "Name": "Aria Cruz", "Designation": "Senior S/w Engg",
    "IsExpand": "false",
    "RatingColor": "#93B85A", "ReportingPerson": 18, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image23.png', "EmployeeID": 'SYNC1014', "Team": "Angular", "EmailId": 'aria.cruz@gmail.com', "PhoneNumber": '0324 - 1819314'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 20, "Name": "Martine Rancé", "Designation": "S/w Engg",
    "IsExpand": "None",
    "RatingColor": "#93B85A", "ReportingPerson": 18, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image10.png', "EmployeeID": 'SYNC1015', "Team": "UX", "EmailId": 'martina.rance@gmail.com', "PhoneNumber": '0324 - 1819315'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 21, "Name": "Maria Larsson", "Designation": "Project Trainee",
    "IsExpand": "false",
    "RatingColor": "#EBB92E", "ReportingPerson": 19, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image11.png', "EmployeeID": 'SYNC1016', "Team": "UX", "EmailId": 'maria.larsson@gmail.com', "PhoneNumber": '0324 - 1819316'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 22, "Name": "Diego Roel", "Designation": "Project Trainee",
    "IsExpand": "false",
    "RatingColor": "#D46E89", "ReportingPerson": 21, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image12.png', "EmployeeID": 'SYNC1017', "Team": "TypeScript", "EmailId": 'diego.roel@gmail.com', "PhoneNumber": '0324 - 1819317'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 23, "Name": "Peter Franken", "Designation": "Project Trainee",
    "IsExpand": "None",
    "RatingColor": "#D46E89", "ReportingPerson": 21, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image13.png', "EmployeeID": 'SYNC1018', "Team": "JavaScript", "EmailId": 'peter.franken@gmail.com', "PhoneNumber": '0324 - 1819318'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 25, "Name": "Carine Schmitt", "Designation": "Project Manager",
    "IsExpand": "None",
    "RatingColor": "#EBB92E", "ReportingPerson": "parent", "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image24.png', "EmployeeID": 'SYNC1019', "Team": "Java", "EmailId": 'carine.schmit@gmail.com', "PhoneNumber": '0324 - 1819319'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 26, "Name": "Paolo Accorti", "Designation": "Project Lead",
    "IsExpand": "None",
    "RatingColor": "#D46E89", "ReportingPerson": 36, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image14.png', "EmployeeID": 'SYNC1020', "Team": "React", "EmailId": 'paolo.acc@gmail.com', "PhoneNumber": '0324 - 1819320'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 27, "Name": "Eduardo Roel", "Designation": "Senior S/w Engg",
    "IsExpand": "true",
    "RatingColor": "#93B85A", "ReportingPerson": 26, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image26.png', "EmployeeID": 'SYNC1021', "Team": "JavaScript", "EmailId": 'eduardo.roel@gmail.com', "PhoneNumber": '0324 - 1819321'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 28, "Name": "José Pedro", "Designation": "Senior S/w Engg",
    "IsExpand": "true",
    "RatingColor": "#D46E89", "ReportingPerson": 27, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image15.png', "EmployeeID": 'SYNC1022', "Team": "Java", "EmailId": 'josé.pedro@gmail.com', "PhoneNumber": '0324 - 1819322'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 29, "Name": "André Fonseca", "Designation": "Senior S/w Engg",
    "IsExpand": "true",
    "RatingColor": "#EBB92E", "ReportingPerson": 28, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image17.png', "EmployeeID": 'SYNC1023', "Team": "React", "EmailId": 'andré.fonseca@gmail.com', "PhoneNumber": '0324 - 1819323'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 30, "Name": "Howard Snyd", "Designation": "S/w Engg",
    "IsExpand": "false",
    "RatingColor": "#68C2DE", "ReportingPerson": 29, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image27.png', "EmployeeID": 'SYNC1024', "Team": "JavaScript", "EmailId": 'howard.synd@gmail.com', "PhoneNumber": '0324 - 1819324'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 31, "Name": "Manu Pereira", "Designation": "Project Trainee",
    "IsExpand": "None",
    "RatingColor": "#D46E89", "ReportingPerson": 29, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image20.png', "EmployeeID": 'SYNC1025', "Team": "JavaScript", "EmailId": 'manu.periera@gmail.com', "PhoneNumber": '0324 - 1819325'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 32, "Name": "Mario Pontes", "Designation": "S/w Engg",
    "IsExpand": "None",
    "RatingColor": "#D46E89", "ReportingPerson": 29, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image22.png', "EmployeeID": 'SYNC1026', "Team": "Java", "EmailId": 'mario.pontes@gmail.com', "PhoneNumber": '0324 - 1819326'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 33, "Name": "Carlos Schmitt", "Designation": "Project Trainee",
    "IsExpand": "None",
    "RatingColor": "#D46E89", "ReportingPerson": 29, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image28.png', "EmployeeID": 'SYNC1027', "Team": "React", "EmailId": 'carlos.schmitt@gmail.com', "PhoneNumber": '0324 - 1819327'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 34, "Name": "Yoshi Latimer", "Designation": "Project Trainee",
    "IsExpand": "true",
    "RatingColor": "#D46E89", "ReportingPerson": 29, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image31.png', "EmployeeID": 'SYNC1028', "Team": "React", "EmailId": 'yoshi.latimer@gmail.com', "PhoneNumber": '0324 - 1819328'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 35, "Name": "Patricia Kenna", "Designation": "Project Trainee",
    "IsExpand": "true",
    "RatingColor": "#EBB92E", "ReportingPerson": 29, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image25.png', "EmployeeID": 'SYNC1029', "Team": "JavaScript", "EmailId": 'patricia.kenna@gmail.com', "PhoneNumber": '0324 - 1819329'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 36, "Name": "Helen Bennett", "Designation": "Project Lead",
    "IsExpand": "None",
    "RatingColor": "#D46E89", "ReportingPerson": 25, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image32.png', "EmployeeID": 'SYNC1030', "Team": "Java", "EmailId": 'helen.bennette@gmail.com', "PhoneNumber": '0324 - 1819330'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 65, "Name": "Alej Camino", "Designation": "Project Manager",
    "IsExpand": "false",
    "RatingColor": "#93B85A", "ReportingPerson": "parent", "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image33.png', "EmployeeID": 'SYNC1031', "Team": "Windows", "EmailId": 'aleg.camino@gmail.com', "PhoneNumber": '0324 - 1819331'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 66, "Name": "Jonas Bergsen", "Designation": "Project Lead",
    "IsExpand": "None",
    "RatingColor": "#68C2DE", "ReportingPerson": 65, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image34.png', "EmployeeID": 'SYNC1032', "Team": "JavaScript", "EmailId": 'jonas.bergsen@gmail.com', "PhoneNumber": '0324 - 1819332'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 67, "Name": "Jose Pavarotti", "Designation": "Project Trainee",
    "IsExpand": "None",
    "RatingColor": "#D46E89", "ReportingPerson": 68, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image29.png', "EmployeeID": 'SYNC1033', "Team": "Windows", "EmailId": 'jose.pavarotti@gmail.com', "PhoneNumber": '0324 - 1819333'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 68, "Name": "Miguel Angel", "Designation": "Senior S/w Engg",
    "IsExpand": "None",
    "RatingColor": "#D46E89", "ReportingPerson": 66, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image30.png', "EmployeeID": 'SYNC1034', "Team": "Angular", "EmailId": 'miguel.angel@gmail.com', "PhoneNumber": '0324 - 1819334'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 69, "Name": "Jytte Petersen", "Designation": "Senior S/w Engg",
    "IsExpand": "true",
    "RatingColor": "#68C2DE", "ReportingPerson": 68, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image4.png', "EmployeeID": 'SYNC1035', "Team": "Angular", "EmailId": 'jytte.petersen@gmail.com', "PhoneNumber": '0324 - 1819335'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 70, "Name": "Kloss Perrier", "Designation": "Project Lead",
    "IsExpand": "None",
    "RatingColor": "#93B85A", "ReportingPerson": 72, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image6.png', "EmployeeID": 'SYNC1036', "Team": "JavaScript", "EmailId": 'closs.perrier@gmail.com', "PhoneNumber": '0324 - 1819336'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 71, "Name": "Art Nancy", "Designation": "Senior S/w Engg",
    "IsExpand": "true",
    "RatingColor": "#D46E89", "ReportingPerson": 27, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image7.png', "EmployeeID": 'SYNC1037', "Team": "Java", "EmailId": 'art.nancy@gmail.com', "PhoneNumber": '0324 - 1819337'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 72, "Name": "Pascal Cartrain", "Designation": "Project Lead",
    "IsExpand": "true",
    "RatingColor": "#EBB92E", "ReportingPerson": 65, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image1.png', "EmployeeID": 'SYNC1038', "Team": "Vue", "EmailId": 'pascal.cartrain@gmail.com', "PhoneNumber": '0324 - 1819338'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 73, "Name": "Liz Nixon", "Designation": "Senior S/w Engg",
    "IsExpand": "false",
    "RatingColor": "#68C2DE", "ReportingPerson": 68, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image2.png', "EmployeeID": 'SYNC1039', "Team": "JavaScript", "EmailId": 'liz.nixon@gmail.com', "PhoneNumber": '0324 - 1819339'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 89, "Name": "Georg Pipps", "Designation": "Senior S/w Engg",
    "IsExpand": "None",
    "RatingColor": "#EBB92E", "ReportingPerson": "parent", "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image8.png', "EmployeeID": 'SYNC1040', "Team": "Java", "EmailId": 'georg.pipps@gmail.com', "PhoneNumber": '0324 - 1819340'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 30, "Name": "Isabel Castro", "Designation": "Project Trainee",
    "IsExpand": "None",
    "RatingColor": "#D46E89", "ReportingPerson": 89, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image3.png', "EmployeeID": 'SYNC1041', "Team": "Windows", "EmailId": 'isabel.castro@gmail.com', "PhoneNumber": '0324 - 1819341'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 90, "Name": "Rene Phillips", "Designation": "Project Trainee",
    "IsExpand": "false",
    "RatingColor": "#68C2DE", "ReportingPerson": 89, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image9.png', "EmployeeID": 'SYNC1042', "Team": "JavaScript", "EmailId": 'rene.phillips@gmail.com', "PhoneNumber": '0324 - 1819342'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 91, "Name": "Lúcia Carvalho", "Designation": "Project Trainee",
    "IsExpand": "None",
    "RatingColor": "#93B85A", "ReportingPerson": 89, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image10.png', "EmployeeID": 'SYNC1043', "Team": "Java", "EmailId": 'lúcia.carvalho@gmail.com', "PhoneNumber": '0324 - 1819343'
  }, {
    "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 92, "Name": "Horst Kloss", "Designation": "Project Trainee",
    "IsExpand": "None",
    "RatingColor": "#D46E89", "ReportingPerson": 89, "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image5.png', "EmployeeID": 'SYNC1044', "Team": "Angular", "EmailId": 'horst.kloss@gmail.com', "PhoneNumber": '0324 - 1819344'
  },
];
let pictureUpload;
// To get the node userhandle.
let handle = [
  {
    name: 'Add New Child', pathData: 'M13.55896,0L18.461914,0 18.461914,13.557983 32,13.557983 32,18.481018 18.5,18.481018 18.5,32 13.55896,32 13.55896,18.481018 0,18.481018 0,13.557983 13.55896,13.557983z',
    offset: 1, side: 'Bottom', tooltip: { content: 'Add New Child', position: 'BottomRight' }
  },
  {
    name: 'Edit Fields', pathData: 'M19.312381,27.48482L18.503085,29.661004 20.944314,29.115917z M24.540007,21.633355L20.390685,25.734296 22.789237,28.131621 26.97936,24.028763z M27.175001,19.029084L25.962399,20.227547 28.408086,22.629793 29.616994,21.446061z M10.602995,15C5.8599977,15 1.999999,18.829 1.999999,23.536 1.999999,24.895 3.1159983,26 4.4899979,26L17.731456,26 17.992104,25.299033 18.172095,25.116051 18.171058,25.116051 23.266144,20.080393 23.156942,19.84575C22.697614,18.897562 22.06124,18.03375 21.28199,17.31 19.682991,15.82 17.592992,15 15.397993,15L12.999995,15z M12.999995,2C9.9420033,2 7.45401,4.467 7.45401,7.5 7.45401,9.947 9.1090055,12.123 11.478999,12.791 12.461997,13.068 13.535994,13.069 14.521991,12.791 16.891984,12.122 18.54598,9.9459996 18.54598,7.5 18.54598,4.467 16.057987,2 12.999995,2z M12.999995,0C17.160984,0 20.545975,3.3639994 20.545975,7.5 20.545975,9.6899061 19.575261,11.720467 17.995872,13.115179L17.808254,13.274325 17.879796,13.290484C19.650854,13.712344 21.290927,14.584437 22.645989,15.846 23.445364,16.590375 24.124036,17.454672 24.656125,18.399828L24.764509,18.599506 26.399983,16.983108C26.614001,16.772111 26.895004,16.666856 27.175756,16.666978 27.456508,16.6671 27.737007,16.772599 27.950018,16.983108L31.969938,20.961079 31.999967,21.450059C31.999967,21.74208,31.88095,22.027051,31.672944,22.233074L23.04003,30.684984 22.706048,30.770982 17.325118,31.973977C17.245102,31.991006 17.165085,31.999978 17.085069,31.999978 16.769093,31.999978 16.464103,31.863993 16.252069,31.619976 15.987118,31.314985 15.91113,30.89 16.054073,30.511035L16.987776,28 4.4899979,28C2.013999,28 0,25.997 0,23.536 0,18.633812 3.3858614,14.50334 7.9561033,13.332249L8.1918802,13.274945 8.0051279,13.116582C6.4251604,11.721779 5.4540157,9.6905622 5.4540157,7.5 5.4540157,3.3639994 8.8390064,0 12.999995,0z',
    visible: true, offset: 1, side: 'Top', margin: { top: 0, bottom: 0, left: 0, right: 0 }, tooltip: { content: 'Edit Fields', position: 'BottomRight' }
  },
];
let fields = { value: 'type', text: 'text' };
// Font family list.
let fontType = [
  { type: 'Arial', text: 'Arial' },
  { type: 'Aharoni', text: 'Aharoni' },
  { type: 'Bell MT', text: 'Bell MT' },
  { type: 'Fantasy', text: 'Fantasy' },
  { type: 'Segoe UI', text: 'Segoe UI' },
  { type: 'Times New Roman', text: 'Times New Roman' },
  { type: 'Verdana', text: 'Verdana' },
];
//Provides a list of search criteria for a search dialog.
let searchDropDownItems = [
  { text: 'Name', value: 'Name' },
  { text: 'Employee ID', value: 'Employee ID' },
  { text: 'Designation', value: 'Designation' },
  { text: 'Team', value: 'Team' },
  { text: 'Email ID', value: 'Email ID' },
  { text: 'Phone Number', value: 'Phone Number' }
];
// Font size list.
let fontSizeList = [
  { text: '8', value: '8pt' },
  { text: '9', value: '9pt' },
  { text: '10', value: '10pt' },
  { text: '11', value: '11pt' },
  { text: '12', value: '12pt' },
  { text: '14', value: '14pt' },
  { text: '16', value: '16pt' },
  { text: '18', value: '18pt' },
  { text: '20', value: '20pt' },
  { text: '22', value: '22pt' },
  { text: '24', value: '24pt' },
  { text: '26', value: '26pt' },
  { text: '28', value: '28pt' },
];
// Returns File menu items.
let getFileMenuItems = [
  {
    text: 'File',
    items: [
      { text: 'New', iconCss: 'sf-icon-new' },
      { text: 'Open', iconCss: 'sf-icon-open' }, { separator: true },
      { text: 'Save', iconCss: 'sf-icon-save' },
      { separator: true },
      { text: 'Export', iconCss: 'sf-icon-export' },
      { text: 'Print', iconCss: 'sf-icon-print' }
    ],
  }
];
// Returns design menu items.
let getDesignItems = [
  {
    text: 'Design',
    items: [
      {
        text: 'Orientation', iconCss: 'sf-icon-page_orientation',
        items: [
          { text: 'Landscape', iconCss: 'sf-icon-check-tick' },
          { text: 'Portrait', iconCss: '' }
        ]
      },
      {
        text: 'Size', iconCss: 'em-icons e-copy',
        items: paperList1()
      },
    ]
  }
];
// Returns View menu items.
let getViewItems = [
  {
    text: 'View',
    items: [
      { text: 'Show Lines', iconCss: '' },
      { text: 'Snap To Grid', iconCss: '' },
      { text: 'Snap To Object', iconCss: 'sf-icon-check-tick' },
      { text: 'Show Ruler', iconCss: 'sf-icon-check-tick' },
      { separator: true },
      { text: 'Fit To Width' },
      { text: 'Fit To Page' },
    ]
  }
];
// Export image formats.
let fileFormats = [
  { text: 'JPG', value: 'JPG' }, { text: 'PNG', value: 'PNG' },
  { text: 'SVG', value: 'SVG' }
];

let dropdownListFields = { text: 'text', value: 'value' };

let diagramRegions = [
  { text: 'Content', value: 'Content' }, { text: 'PageSettings', value: 'PageSettings' }
];

let fontFamily;
let dglTarget;

export class CommonKeyboardCommands {
  static download() {
    if (window.navigator.msSaveBlob) {
      var blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
      window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
      var a = document.createElement('a');
      a.href = dataStr;
      a.download = document.getElementById('diagramName') ? document.getElementById('diagramName').innerHTML + '.json' : 'Diagram.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }
}
//Load the diagram
function loadDiagram(event) {
  var diagram = document.getElementById("diagram").ej2_instances[0];
  diagram.loadDiagram(event.target.result);
  diagram.fitToPage({ mode: 'Page', region: 'Content' });
}
//Expand and collapse the nodes
function onChange(args) {
  var diagramInstance = document.getElementById("diagram").ej2_instances[0];
  for (let node of diagramInstance.nodes) {
    if (args.checked) {
      node.expandIcon.shape = 'Minus';
      node.collapseIcon.shape = 'Plus';
    }
    else {
      node.expandIcon.shape = 'None';
      node.collapseIcon.shape = 'None';
    }
  }
  diagramInstance.dataBind();
  diagramInstance.doLayout();
}
// Returns paper list with size value.
function paperList1() {
  var paperList1 = [
    { text: 'Letter (8.5 in x 11 in)', value: 'Letter', iconCss: 'sf-icon-check-tick' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
    { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
    { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
    { text: 'A6 (105 mm x 148 mm)', value: 'A6' },
  ];
  return paperList1;
}
// To apply the image's base64 value to the imageUrl of node data.
function applyBase64AsImageUrl(base64String) {
  var diagram = document.getElementById("diagram").ej2_instances[0];
  let selectedNode = diagram.selectedItems.nodes[0];
  selectedNode.data.ImageUrl = base64String;
  diagram.dataSourceSettings.dataSource.dataSource.json.find(x => x.Id == selectedNode.data.Id).ImageUrl = base64String;
  var imageTag = document.getElementById(selectedNode.id + '_picimage');
  imageTag.href.baseVal = base64String;
}
// To render the shortcut keys for menu items.
function getShortCutKey(menuItem) {
  var shortCutKey = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
  switch (menuItem) {
    case 'New':
      shortCutKey = 'Shift' + '+N';
      break;
    case 'Open':
      shortCutKey = shortCutKey + '+O';
      break;
    case 'Save':
      shortCutKey = shortCutKey + '+S';
      break;
    default:
      shortCutKey = '';
      break;
  }
  return shortCutKey;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    menuClick = this.menuClick.bind(this);
    uploadChange = this.onUploadSuccess.bind(this);
    tooledit = UtilityMethods.prototype.toolbarClick.bind(this);
    insertOrRemovePicture = UtilityMethods.prototype.insertOrRemovePicture.bind(this);
    modifyNodeTemplate = UtilityMethods.prototype.modifyNodeTemplate.bind(this);
    this.dialogAnimationSettings = { effect: 'None' };
    this.dglTarget = document.body;
    this.path = {
      saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
      removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };
  }
  getNodeTemplate(obj) {
    let content = new StackPanel();
    content.id = obj.id + '_outerstack';
    content.orientation = 'Horizontal';
    content.style.strokeColor = obj.data.StrokeColor;
    content.style.fill = obj.data.Fill;
    content.padding = { left: 5, right: 10, top: 5, bottom: 5 };

    // Add the line at the top of the outer stack
    let line = new PathElement();
    line.data = 'M0,0 L1,0'; // Line from (0,0) to (1,0)
    line.width = 2;
    line.height = 1;
    line.style.strokeWidth = 2;
    line.style.margin = { left: 20, right: 20, top: 20, bottom: 20 };
    line.style.strokeColor = (obj.data).RatingColor;
    line.horizontalAlignment = 'Stretch';
    line.verticalAlignment = 'Top';
    line.id = obj.id + '_line';

    let image = new ImageElement();
    image.width = 50;
    image.height = 50;
    image.source = (obj.data).ImageUrl ? (obj.data).ImageUrl : '';
    image.id = obj.id + '_pic';
    image.style.strokeColor = 'transparent';
    image.style.fill = 'transparent';

    let innerStack = new StackPanel();
    innerStack.style.strokeColor = 'transparent';
    innerStack.style.fill = 'transparent';
    innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
    innerStack.id = obj.id + '_innerstack';

    let text = new TextElement();
    text.content = (obj.data).Name;
    text.style.color = obj.data.color;

    text.style.italic = obj.data.IsItalic;
    text.style.textDecoration = obj.data.Decoration;
    text.style.fontSize = obj.data.FontSize;
    text.style.fontFamily = obj.data.FontFamily;
    text.style.strokeColor = 'none';
    text.horizontalAlignment = 'Left';
    text.style.fill = 'none';
    text.id = obj.id + '_text1';

    let desigText = new TextElement();
    desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
    desigText.content = (obj.data).Designation;
    desigText.style.color = obj.data.color;

    desigText.style.italic = obj.data.IsItalic;
    desigText.style.textDecoration = obj.data.Decoration;
    desigText.style.fontSize = obj.data.FontSize;
    desigText.style.fontFamily = obj.data.FontFamily;
    desigText.style.strokeColor = 'none';
    desigText.style.fill = 'none';
    desigText.horizontalAlignment = 'Left';
    desigText.style.textWrapping = 'Wrap';
    desigText.id = obj.id + '_desig';
    innerStack.children = [text, desigText];
    // Add the line to the innerStack, and the innerStack to the content stack
    innerStack.children = [line, text, desigText];
    content.children = [image, innerStack];
    return content;
  }
  // Picture dropdown items.
  pictureItems() {
    const items = [
      { text: 'Insert', },
      { text: 'Change', },
      { text: 'Delete', },
      { text: 'Show/Hide', },
    ]
    return items;
  }
  // Node shape template with image alignment.
  shapeTemplatesItems() {
    const items = [
      { text: 'Image at top', },
      { text: 'Image at left', },
      { text: 'No image' }
    ]
    return items;
  }
  // Fields multi-selection dropdown items.
  fieldsListItems() {
    const items = [
      { Name: 'Name', Code: 'Name' },
      { Name: 'Employee ID', Code: 'EID' },
      { Name: 'Designation', Code: 'Desig' },
      { Name: 'Team', Code: 'Team' },
      { Name: 'Email ID', Code: 'Email' },
      { Name: 'Phone Numebr', Code: 'Phone' }
    ]
    return items;
  }
  // To handle menu click.
  menuClick(args) {
    const buttonElement = document.getElementsByClassName('e-btn-hover')[0];
    var zoomSlider = document.getElementById("zoomSlider").ej2_instances[0];
    if (buttonElement) {
      buttonElement.classList.remove('e-btn-hover');
    }
    const diagram = document.getElementById("diagram").ej2_instances[0];
    const exportDialog = document.getElementById("exportDialog").ej2_instances[0];
    const commandType = args.item.text.replace(/[' ']/g, '');
    switch (commandType.toLowerCase()) {
      case 'new':
        diagram.clear();
        DiagramClientSideEvents.prototype.historyChange();
        break;
      case 'open':
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        break;
      case 'save':
        var data = diagram.saveDiagram();
        CommonKeyboardCommands.download(data);
        break;
      case 'print':
        let options = { region: 'Content', mode: 'Data', multiplePage: true, margin: { left: 0, top: 0, bottom: 0, right: 0 } };
        var hOffset = diagram.scrollSettings.horizontalOffset;
        var vOffset = diagram.scrollSettings.verticalOffset;
        var zoom = diagram.scrollSettings.currentZoom;
        localStorage.setItem('print', diagram.saveDiagram());
        diagram.loadDiagram(localStorage.getItem('print'));
        diagram.print(options);
        if (zoom <= 0.45) {
          diagram.fitToPage({ mode: 'Page', region: 'Content' });
        } else {
          diagram.scrollSettings.horizontalOffset = hOffset;
          diagram.scrollSettings.verticalOffset = vOffset;
        }
        diagram.dataBind();
        break;
      case 'export':
        exportDialog.show();
        break;
      case 'landscape':
        args.item.parentObj.items[1].iconCss = '';
        args.item.iconCss = 'sf-icon-check-tick';
        diagram.pageSettings.orientation = 'Landscape';
        break;
      case 'portrait':
        args.item.parentObj.items[0].iconCss = '';
        args.item.iconCss = 'sf-icon-check-tick';
        diagram.pageSettings.orientation = 'Portrait';
        break;
      case 'letter(8.5inx11in)':
      case 'legal(8.5inx14in)':
      case 'a3(297mmx420mm)':
      case 'a4(210mmx297mm)':
      case 'a5(148mmx210mm)':
      case 'a6(105mmx148mm)':
      case 'tabloid(279mmx432mm)':
        UtilityMethods.prototype.paperListChange(args)
        UtilityMethods.prototype.updateSelection(args.item)
        break;
      case 'showlines':
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.ShowLines;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'snaptogrid':
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.SnapToLines;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'snaptoobject':
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.SnapToObject;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'showruler':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        diagram.rulerSettings.showRulers = !diagram.rulerSettings.showRulers;
        break;
      case 'showpagebreaks':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        diagram.pageSettings.showPageBreaks = !diagram.pageSettings.showPageBreaks;
        break;
      case 'showmultiplepage':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        diagram.pageSettings.multiplePage = !diagram.pageSettings.multiplePage;
        break;
      case 'fittowidth':
        diagram.fitToPage({ mode: 'Width' });
        document.getElementById('zoomSliderText').value = Math.round(diagram.scrollSettings.currentZoom * 100) + '%';
        zoomSlider.value = Math.round(diagram.scrollSettings.currentZoom * 100);
        break;
      case 'fittopage':
        diagram.fitToPage({ mode: 'Page', region: 'Content' });
        document.getElementById('zoomSliderText').value = Math.round(diagram.scrollSettings.currentZoom * 100) + '%';
        zoomSlider.value = Math.round(diagram.scrollSettings.currentZoom * 100);
        break;
    }
    diagram.dataBind();
  }
  // To rename diagram.
  renameDiagram(args) {
    document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
    const element = document.getElementById('diagramEditable');
    element.value = document.getElementById('diagramName').innerHTML;
    element.focus();
    element.select();
  }
  // Event handler triggered when the diagram name is changed.
  diagramNameKeyDown(args) {
    if (args.which === 13) {
      document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
      document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    }
  }
  // Used to change the name of the diagram.
  diagramNameChange() {
    var diagram = document.getElementById("diagram").ej2_instances[0];
    document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
    document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
  }
  // Triggers when the JSON file is uploaded successfully. 
  onUploadSuccess(args) {
    var file1 = args.file;
    var file = file1.rawFile;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = loadDiagram;
  }
  // Triggers when the image is uploaded successfully.
  onPictureUploadSuccess(args) {
    const file = args.file;
    const reader = new FileReader();
    reader.onload = function () {
      const base64String = reader.result;
      applyBase64AsImageUrl(base64String);
    };
    reader.readAsDataURL(file.rawFile);
  }
  onUploadFailure(args) {
    document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
  }
  onUploadFileSelected(args) {
    document.getElementsByClassName('sb-content-overlay')[0].style.display = '';
  }
  fontFamilyChange = () => {
    return (
      <DropDownListComponent id="fontfamily" popupWidth={160} width={'100%'} fields={fields} placeholder={'select a font type'} index={0} dataSource={fontType} change={(args) => {
        if (args.value) {
          args.value = null;
        }
        UtilityMethods.prototype.fontStyleChange(args);
      }} />
    );
  }
  fontSizeChange = () => {
    return (
      <div className="col-xs-4 column-style">
        <DropDownListComponent dataSource={fontSizeList} id="fontSize" index={4} width={'60px'} change={(args) => {
          UtilityMethods.prototype.fontStyleChange(args);
        }} />
      </div>);
  }

  fontColorChange = () => {
    return (
      <ColorPickerComponent id='inline-palette' className='color-font' value='#000000' modeSwitcher={true} mode='Palette' iconCss='sf-icon-text tb-icons' change={(args) => {
        UtilityMethods.prototype.fontColorChange(args)
      }}></ColorPickerComponent>
    );
  }
  fillColorChange = () => {
    return (
      <ColorPickerComponent id='inline-palette' className='color-fill' modeSwitcher={true} mode='Palette' change={(args) => {
        UtilityMethods.prototype.fillColorChange(args)
      }}></ColorPickerComponent>
    );
  }
  strokeColorChange = () => {
    return (
      <ColorPickerComponent id='inline-palette' className='color-stroke' value='#000000' modeSwitcher={true} mode='Palette' change={(args) => {
        UtilityMethods.prototype.strokeColorChange(args)
      }}></ColorPickerComponent>
    );
  }
  exportContent = () => {
    return (
      <div id="exportDialogContent">
        <div className="row">
          <div className="row">
            File Name
          </div>
          <div className="row db-dialog-child-prop-row">
            <input type="text" id="exportfileName" value="Untitled Diagram" />
          </div>
        </div>
        <div className="row db-dialog-prop-row">
          <div className="col-xs-6 db-col-left">
            <div className="row">
              Format
            </div>
            <div className="row db-dialog-child-prop-row">
              <DropDownListComponent id="exportFormat" ref={dropdown => this.ddlTextPosition = dropdown} value={"JPG"} dataSource={fileFormats} fields={dropdownListFields} />
            </div>
          </div>
          <div className="col-xs-6 db-col-right">
            <div className="row">
              Region
            </div>
            <div className="row db-dialog-child-prop-row">
              <DropDownListComponent ref={dropdown => this.ddlTextPosition = dropdown} id="exportRegion" value={"PageSettings"} dataSource={diagramRegions} fields={dropdownListFields} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  searchContent = () => {
    return (<div id="searchDialogContent">
      <div class="row"><div class="row">Search By</div>
        <div class="row db-dialog-child-prop-row">
          <DropDownListComponent id="searchDropDown" popupWidth={160} width={'100%'} fields={dropdownListFields} index={0} dataSource={searchDropDownItems} />
        </div>
        <div class="row">Search Value</div>
        <div class="row db-dialog-child-prop-row">
          <input type="text" id="searchBox" />
        </div>
      </div>
    </div>
    );
  }

  content = () => {
    return (<div id="editNodeDialogContent">
      <div className="row">
        Name
      </div>
      <div className="row db-dialog-child-prop-row">
        <input type="text" id="name"></input>
      </div>
      <br></br>
      <div className="row">
        Role
      </div>
      <div className="row db-dialog-child-prop-row">
        <input type="text" id="role"></input>
      </div>
      <br></br>
      <div className="row">
        Employee Id
      </div>
      <div className="row db-dialog-child-prop-row">
        <input type="text" id="empId"></input>
      </div>
      <br></br>
      <div className="row">
        Team
      </div>
      <div className="row db-dialog-child-prop-row">
        <input type="text" id="team"></input>
      </div>
      <br></br>
      <div className="row">
        E-mail
      </div>
      <div className="row db-dialog-child-prop-row">
        <input type="text" id="mail"></input>
      </div>
      <br></br>
      <div className="row">
        Phone Number</div>
      <div className="row db-dialog-child-prop-row">
        <input type="text" id="phNumber"></input>
      </div>
      <br></br>
    </div>);
  };
  footerTemplate = () => {
    return (<div>
      <button id="apply" className="e-control e-btn e-primary" cssclass='e-flat e-db-primary' data-ripple="true" onClick={this.applyClick} >Apply</button>
      <button id="cancel" className="e-control e-btn e-primary" cssclass='e-flat e-db-primary' data-ripple="true" onClick={this.cancel}>Cancel</button>
    </div>);
  };
  applyClick() {
    var diagram = document.getElementById("diagram").ej2_instances[0];
    var dialogInstance = document.getElementById("defaultdialog").ej2_instances[0];
    var node = diagram.selectedItems.nodes[0];
    let name = document.getElementById('name');
    let designation = document.getElementById('role');
    let employeeID = document.getElementById('empId');
    let team = document.getElementById('team');
    let email = document.getElementById('mail');
    let phoneNo = document.getElementById('phNumber');
    node.data.Name = name.value;
    var nameText = document.getElementById(node.id + '_text1_text');
    if (nameText) {
      nameText.textContent = name.value;
    }
    node.data.Designation = designation.value;
    var desigText = document.getElementById(node.id + '_desig_text');
    if (desigText) {
      desigText.textContent = designation.value;
    }
    node.data.EmployeeID = employeeID.value;
    var eidText = document.getElementById(node.id + '_eid_text');
    if (eidText) {
      eidText.textContent = employeeID.value;
    }
    node.data.Team = team.value;
    var teamText = document.getElementById(node.id + '_team_text');
    if (teamText) {
      teamText.textContent = team.value;
    }
    node.data.EmailId = email.value;
    var emailText = document.getElementById(node.id + '_email_text');
    if (emailText) {
      emailText.textContent = email.value;
    }
    node.data.PhoneNumber = phoneNo.value;
    var phoneText = document.getElementById(node.id + '_phone_text');
    if (phoneText) {
      phoneText.textContent = phoneNo.value;
    }
    node.tooltip.content = getContent(node.data);
    dialogInstance.hide();
  };
  cancel() {
    var dialogInstance = document.getElementById("defaultdialog").ej2_instances[0];
    dialogInstance.hide();
  }
  reLayoutBtn = () => {
    var diagram = document.getElementById("diagram").ej2_instances[0];
    diagram.doLayout();
  }
  addAssistantBtn = () => {
    DiagramClientSideEvents.prototype.addChild();
  }
  searchExport() {
    var searchDialog = document.getElementById("searchDialog").ej2_instances[0];
    searchDialog.show();
  }
  // To close the overview when we click the close button.
  toggleOverviewButton = () => {
    var toolbarObj = document.getElementById("toolbarEditor").ej2_instances[0];
    document.getElementById('overview-container').style.position = '';
    document.getElementById('overview-container').style.zIndex = '-1';
    toolbarObj.items[toolbarObj.items.length - 1].cssClass = toolbarObj.items[toolbarObj.items.length - 1].cssClass.replace('active', '');
  }
  // Triggers before rendering menu item.
  beforeItemRender = (args) => {
    var shortCutText = getShortCutKey(args.item.text);
    if (shortCutText) {
      var shortCutSpan = document.createElement('span');
      var text = args.item.text;
      shortCutSpan.textContent = shortCutText;
      shortCutSpan.style.pointerEvents = 'none';
      args.element.appendChild(shortCutSpan);
      shortCutSpan.setAttribute('class', 'db-shortcut');
    }
  }
  // Diagram initialization.
  render() {
    return (<div className='diagrambuilder-container tailwind'>
      <div className="db-header-navbar">
        <div className="db-header-container">
          <div className="db-diagram-name-container">
            <span id='diagramName' className="db-diagram-name" style={{
              width: "250px", overflow: "hidden",
              textOverflow: "ellipse", whiteSpace: "nowrap", color: "white"
            }} onClick={this.renameDiagram.bind(this)}>
              Untitled Diagram
            </span>
            <input id='diagramEditable' type="text" className="db-diagram-name" onKeyDown={this.diagramNameKeyDown.bind(this)} onBlur={this.diagramNameChange.bind(this)} />
            <span id='diagramreport' className="db-diagram-name db-save-text" /> 
          </div>
          <div className='db-menu-container'>
            <MenuComponent id="btnFileMenu" cssclass={"e-caret-hide"} content="File" items={getFileMenuItems} select={this.menuClick} beforeItemRender={this.beforeItemRender.bind(this)} />
            <MenuComponent id="btnEditMenu" cssclass={"e-caret-hide"} content="Design" items={getDesignItems} select={this.menuClick} />
            <MenuComponent id="btnViewMenu" cssclass={"e-caret-hide"} content="View" items={getViewItems} select={this.menuClick} />
          </div>
        </div>
        <div className='db-toolbar-editor'>
        <div className='db-toolbar-container'>
          <ToolbarComponent ref={toolbar => (toolbarEditor) = toolbar} id='toolbarEditor' overflowMode='Scrollable' clicked={tooledit}>
            <ItemsDirective>
              <ItemDirective prefixIcon="sf-icon-save tb-icons" tooltipText="Save Diagram" cssClass="tb-item-start tb-item-save" />
              <ItemDirective prefixIcon="sf-icon-open tb-icons" tooltipText="Open Diagram" cssClass="tb-item-middle tb-item-open" />
              <ItemDirective prefixIcon="sf-icon-print tb-icons" tooltipText="Print Diagram" cssClass="tb-item-middle tb-item-print" />
              <ItemDirective prefixIcon="sf-icon-export tb-icons" tooltipText="Export Diagram" cssClass="tb-item-end tb-item-export" />
              <ItemDirective type="Separator" />
              <ItemDirective prefixIcon="sf-icon-undo tb-icons" tooltipText="Undo" cssClass="tb-item-start tb-item-undo" />
              <ItemDirective prefixIcon="sf-icon-redo tb-icons" tooltipText="Redo" cssClass="tb-item-end tb-item-redo" />
              <ItemDirective type="Separator" />
              <ItemDirective tooltipText="Font Family" template={this.fontFamilyChange} cssClass="tb-item-start item-singleSelect" />
              <ItemDirective tooltipText="Font Size" align="Left" template={this.fontSizeChange} cssClass="tb-item-start item-singleSelect" />
              <ItemDirective type="Separator" />
              <ItemDirective prefixIcon="sf-icon-bold tb-icons" tooltipText="Bold" cssClass="tb-item-start item-singleSelect" />
              <ItemDirective prefixIcon="sf-icon-italic tb-icons" tooltipText="Italic" cssClass="tb-item-middle item-singleSelect" />
              <ItemDirective prefixIcon="sf-icon-underline tb-icons" tooltipText="Underline" cssClass="tb-item-end item-singleSelect" />
              <ItemDirective type="Separator" />
              <ItemDirective prefixIcon="sf-icon-text tb-icons" tooltipText="Font Color" template={this.fontColorChange} cssClass="tb-item-start item-singleSelect" />
              <ItemDirective prefixIcon="sf-icon-fil_colour tb-icons" tooltipText="Fill Color" template={this.fillColorChange} cssClass="tb-item-start item-singleSelect" />
              <ItemDirective prefixIcon="sf-icon-stroke tb-icons" tooltipText="Stroke Color" template={this.strokeColorChange} cssClass="tb-item-end item-singleSelect" />
              <ItemDirective type="Separator" />
              <ItemDirective prefixIcon="sf-icon-pointer" tooltipText="Select Tool" cssClass="tb-item-start tb-item-selected" />
              <ItemDirective prefixIcon="sf-icon-pan" tooltipText="Pan Tool" cssClass="tb-item-middle" />
              <ItemDirective prefixIcon="db-overview" tooltipText="Overview" cssClass="tb-item-end db-overview" />
            </ItemsDirective>
          </ToolbarComponent>
        </div>
        </div>
      </div>
      <div className='row content'>
        <div style={{ float: 'left', width: '70%' }}>
          <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"106%"} height={"750px"} rulerSettings={{ showRulers: true }} snapSettings={{ constraints: SnapConstraints.None }}
            dataSourceSettings={{
              id: "Id",
              parentId: "ReportingPerson",
              dataSource: new DataManager(data),
            }} layout={{
              type: "OrganizationalChart",
              getLayoutInfo: (node, options) => {
                if (!options.hasSubTree) {
                  options.type = 'Right';
                }
              }
            }}
            selectedItems={{
              constraints: SelectorConstraints.All,
              userHandles: handle,
            }}
            getNodeDefaults={(obj) => {
              obj.height = 50;
              obj.addInfo = { fill: 'white' };
              obj.constraints = NodeConstraints.Default & ~NodeConstraints.Rotate | NodeConstraints.Tooltip;
              obj.tooltip = { content: getContent(obj.data), position: 'BottomRight', relativeMode: 'Object' };
              obj.style = { fill: 'transparent', strokeWidth: 2 };
              obj.expandIcon = {
                height: 20,
                width: 20,
                iconColor: 'white',
                cornerRadius: 10,
                borderColor: 'black',
                shape: 'None',
                fill: 'black',
                offset: { x: 0.5, y: 1.2 },
                pathData: 'M16.261993,32L16.359985,31.934998 16.454987,32 16.48999,31.846008 32,20.705013 32,12.254999 16.359985,23.539014 0,12.254999 0,20.705013 15.77301,31.846008z'
              };
              obj.collapseIcon = {
                height: 20,
                width: 20,
                iconColor: 'white',
                cornerRadius: 10,
                borderColor: 'black',
                shape: 'None',
                fill: 'black',
                offset: { x: 0.5, y: 1.2 },
                pathData: 'M16.261993,0L16.359985,0.065002445 16.454987,0 16.48999,0.15399169 32,11.294986 32,19.745 16.359985,8.5149861 0,19.745 0,11.294986 16.22699,0.15399169z'
              };
              return obj;
            }}
            getConnectorDefaults={(connector, diagram) => {
              connector.targetDecorator.shape = 'None';
              connector.type = 'Orthogonal';
              connector.constraints = ConnectorConstraints.Default & ~ConnectorConstraints.Select;
              connector.style.strokeColor = 'gray';
              return connector;
            }}
            setNodeTemplate={(node) => {
              return this.getNodeTemplate(node);
            }}
            scrollSettings={{
              minZoom: 0.3, maxZoom: 3.2
            }}
            pageSettings={{
              background: { color: '#FFFFFF' }, margin: { left: 5, top: 5 },
              orientation: 'Landscape', showPageBreaks: false, multiplePage: false
            }}
            selectionChange={(args) => {
              DiagramClientSideEvents.prototype.selectionChange(args);
            }}
            onUserHandleMouseDown={(args) => {
              DiagramClientSideEvents.prototype.onUserHandleMouseDown(args);
            }}
            historyChange={(args) => {
              DiagramClientSideEvents.prototype.historyChange(args);
            }}
            scrollChange={(args) => {
              DiagramClientSideEvents.prototype.scrollChange(args);
            }}
            created={() => {
              diagramInstance.fitToPage({ mode: 'Page', region: 'Content' });
              document.getElementById('zoomSliderText').value = Math.round(diagramInstance.scrollSettings.currentZoom * 100) + '%';
            }}
          >
            <Inject services={[
              DataBinding,
              HierarchicalTree,
            ]} />
          </DiagramComponent>
        </div>
        <div className='db-property-editor-container' id="propertyPanel" style={{ float: 'right', padding: '10px', width: '25%', overflow: 'auto' }}>
          <div id="generalDiagramContainer" className="db-general-diagram-prop-container">
            <div id='diagramPropertyContainer' className="db-diagram-prop-container">
              <div className="row db-prop-header-text" id='properties'>
                Properties
              </div>
              <div className="row property-panel-content" id="appearance">
                <div className="row" style={{ paddingTop: '10px' }}>
                  <div className="row row-header" style={{ paddingTop: '10px' }}>
                    Subtree Alignment
                  </div>
                  <div id="pattern">
                    <div className="row" style={{ paddingTop: '8px' }}>
                      <div className="image-pattern-style" id="pattern1" onClick={subtreeClick.bind(this)} style={{ backgroundImage: 'url(https://ej2.syncfusion.com/javascript/demos/src/diagram/patternimages/Pattern_1.png)', marginRight: '3px' }}>
                      </div>
                      <div className="image-pattern-style" id="pattern2" onClick={subtreeClick.bind(this)} style={{ backgroundImage: 'url(https://ej2.syncfusion.com/javascript/demos/src/diagram/patternimages/Pattern_2.png)', margin: '0px 3px' }}>
                      </div>
                      <div className="image-pattern-style  e-selected-pattern-style" id="pattern5" onClick={subtreeClick.bind(this)} style={{ backgroundImage: 'url(https://ej2.syncfusion.com/javascript/demos/src/diagram/patternimages/Pattern_5.png)', margin: '0px 3px' }}>
                      </div>
                    </div>
                    <div className="row" style={{ paddingTop: '8px' }}>
                      <div className="image-pattern-style" id="pattern6" onClick={subtreeClick.bind(this)} style={{ backgroundImage: 'url(https://ej2.syncfusion.com/javascript/demos/src/diagram/patternimages/Pattern_6.png)', margin: '0px 3px' }}>
                      </div>
                      <div className="image-pattern-style" id="pattern7" onClick={subtreeClick.bind(this)} style={{ backgroundImage: 'url(https://ej2.syncfusion.com/javascript/demos/src/diagram/patternimages/Pattern_7.png)', margin: '0px 3px' }}>
                      </div>
                      <div className="image-pattern-style" id="pattern8" onClick={subtreeClick.bind(this)} style={{ backgroundImage: 'url(https://ej2.syncfusion.com/javascript/demos/src/diagram/patternimages/Pattern_8.png)', margin: '0px 3px' }}>
                      </div>
                    </div>
                    <div className="row" style={{ paddingTop: '8px' }}>
                      <div className="image-pattern-style" id="pattern9" onClick={subtreeClick.bind(this)} style={{ backgroundImage: 'url(https://ej2.syncfusion.com/javascript/demos/src/diagram/patternimages/Pattern_9.png)', margin: '0px 3px' }}>
                      </div>
                    </div>
                  </div>
                  <div className="row row-header" style={{ paddingTop: '8px' }}>
                    Orientation
                  </div>
                  <div id="orientation">
                    <div className="row" style={{ paddingTop: '8px' }}>
                      <div className="image-pattern-style2 e-selected-orientation-style" onClick={orientateClick.bind(this)} id="TopToBottom" style={{ backgroundImage: 'url(https://ej2.syncfusion.com/javascript/demos/src/diagram/Images/common-orientation/toptobottom.png)', marginRight: '3px' }}>
                      </div>
                      <div className="image-pattern-style2" onClick={orientateClick.bind(this)} id="BottomToTop" style={{ backgroundImage: 'url(https://ej2.syncfusion.com/javascript/demos/src/diagram/Images/common-orientation/bottomtotop.png)', margin: '0px 3px' }}>
                      </div>
                      <div className="image-pattern-style2" onClick={orientateClick.bind(this)} id="LeftToRight" style={{ backgroundImage: 'url(https://ej2.syncfusion.com/javascript/demos/src/diagram/Images/common-orientation/lefttoright.png)', margin: '0px 3px' }}>
                      </div>
                      <div className="row" style={{ paddingTop: '8px' }}>
                        <div className="image-pattern-style2" onClick={orientateClick.bind(this)} id="RightToLeft" style={{ backgroundImage: 'url(https://ej2.syncfusion.com/javascript/demos/src/diagram/Images/common-orientation/righttoleft.png)', margin: '0px 3px' }}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row db-prop-row" style={{ marginLeft: '15px', paddingTop: '10px' }}>
                  <button id="reLayoutBtn" onClick={this.reLayoutBtn} className="e-control e-btn e-primary" cssclass='e-flat e-db-primary' data-ripple="true" style={{ fontSize: '10px' }}>Re-Layout</button>
                  <ButtonComponent id="addAssistantBtn" onClick={this.addAssistantBtn} iconCss="sf-icon-add-child" className="e-control e-btn e-primary" cssclass='e-flat e-db-primary' data-ripple="true" style={{ fontSize: '10px' }}>Add-Assistant</ButtonComponent>
                </div>
                <div className="row property-panel-content" style={{ paddingTop: "10px" }}>
                  <div className="row row-header">Behavior</div>
                  <div className="row" style={{ paddingTop: '8px', paddingBottom: '10px' }}>
                    <div style={{ display: "table", height: "5px" }} className="col-xs-6">
                      <div style={{ display: "table-cell", fontSize: '10px', verticalAlign: "middle", marginRight: '10px' }}>
                        Horizontal Spacing
                      </div>
                      <div className="col-xs-4 db-col-right" style={{ marginLeft: '6px' }}>
                        <div className="db-text-container" style={{ width: '77px', marginLeft: '20px' }}>
                          <div className="db-text-input">
                            <NumericTextBoxComponent ref={hSpacingRef => (hSpacing = hSpacingRef)} format="##.##" width={'77px'} id="hSpacing" style={{ width: "100%" }} min={20} max={60} step={2} value={30} change={() => {
                              diagramInstance.layout.horizontalSpacing = Number(hSpacing.value);
                              diagramInstance.dataBind();
                            }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div style={{ display: "table", height: "5px" }} className="col-xs-6">
                      <div style={{ display: "table-cell", fontSize: '10px', verticalAlign: "middle" }}>
                        Vertical Spacing
                      </div>
                      <div className="col-xs-4 db-col-right" style={{ marginLeft: "6px" }}>
                        <div className="db-text-container" style={{ width: "77px", marginLeft: "20px" }}>
                          <div className="db-text-input">
                            <NumericTextBoxComponent ref={vSpacingRef => (vSpacing = vSpacingRef)} format="n" width={'77px'} d="vSpacing" style={{ width: "100%" }} min={30} max={100} step={1} value={30} change={() => {
                              diagramInstance.layout.verticalSpacing = Number(vSpacing.value);
                              diagramInstance.dataBind();
                            }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row db-prop-row" style={{ borderTop: '1px solid #CBCBCB', paddingTop: '10px', paddingBottom: '10px' }}>
                  <div className="col-xs-4 db-col-left" style={{ width: '160px', marginLeft: '5px' }}>
                    <DropDownButtonComponent id="pictureDropdown" iconCss='sf-icon-insert_image' content="Picture" width={'100px'} items={this.pictureItems()} select={insertOrRemovePicture} />
                  </div>
                  <div className="col-xs-6 db-col-right" style={{ width: '160px' }}>
                    <DropDownButtonComponent id="shapeTemplatesDropDown" iconCss='e-icons e-properties-2' content="Templates" width={'100px'} items={this.shapeTemplatesItems()} select={modifyNodeTemplate} />
                  </div>
                </div>
                <div className="row db-prop-row" style={{ borderTop: '1px solid #CBCBCB', paddingTop: '10px', paddingBottom: '10px' }}>
                  <div className="col-xs-6 db-col-left" style={{ marginLeft: '5px' }}>
                    <MultiSelectComponent id="multiCheckbox" dataSource={this.fieldsListItems()} fields={{ text: 'Name', value: 'Code' }} placeholder="Fields" value={['Name', 'Desig']} mode="CheckBox" filterBarPlaceholder="Search data" popupHeight="350px" change={modifyNodeTemplate}>
                      <Inject services={[CheckBoxSelection]} />
                    </MultiSelectComponent>
                  </div>
                  <div className="col-xs-4 db-col-right" style={{ marginLeft: '10px' }}>
                    <ButtonComponent cssclass='db-search-btn' iconCss='e-icons e-search' isPrimary onClick={this.searchExport}>Search</ButtonComponent>
                  </div>
                </div>
                <div className="row db-prop-row" style={{ borderTop: '1px solid #CBCBCB', paddingTop: '10px' }}>
                  <CheckBoxComponent checked={false} label="Expandable" change={onChange.bind(this)}></CheckBoxComponent>
                </div>
                <div className="row db-prop-row">
                  <div className="col-xs-2 db-col-right db-prop-text-style" style={{ paddingTop: '6px', marginLeft: '10px' }}>
                    <span className="db-prop-text-style">Zoom</span>
                  </div>
                  <div className="col-xs-6 db-col-left" style={{ paddingRight: '10px' }}>
                    <SliderComponent id='zoomSlider' value={'diagramInstance.scrollSettings.currentZoom * 100'} max={'300'} min={'30'} type='MinRange' change={(args) => {
                      UtilityMethods.prototype.zoomChange(args);
                    }} />
                  </div>
                  <div className="col-xs-2 db-col-right">
                    <input id="zoomSliderText" type="text" value={'100%'} readOnly={true} className="db-readonly-input" />
                  </div>
                </div>
                <div className="col-lg-4" id="overview-container" style={{ zIndex: '-1', width: '25%', padding: '0px', right: '30px', bottom: '20px', border: '#eeeeee', borderStyle: 'solid', boxShadow: '0px 2px 2px rgba(0,0,0,0.3)', background: '#f7f7f7' }}>
                  <button className="overview-toggle-btn" id="toggleOverviewButton" onClick={this.toggleOverviewButton}>&#215;</button>
                  <OverviewComponent id="overview" style={{ top: "30px", left: "20px" }} sourceID="diagram" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='uploadDefault'>
          <UploaderComponent ref={defaultupload => this.defaultupload = defaultupload} id='defaultfileupload' asyncSettings={this.path} success={this.onUploadSuccess} failure={this.onUploadFailure} progress={this.onUploadFileSelected} />
        </div>
        <div className='pictureUpload'>
          <UploaderComponent ref={pictureUpload => this.pictureUpload = pictureUpload} showFileList={false} id='pictureUpload' asyncSettings={this.path} success={this.onPictureUploadSuccess} />
        </div>
        <div className='defaultdialog'>
          <DialogComponent id="defaultdialog" target={this.dglTarget} showCloseIcon={true} isModal={true} animationSettings={this.dialogAnimationSettings} width="400px" content={this.content} footerTemplate={this.footerTemplate} header="Properties" visible={false}>
          </DialogComponent>
        </div>
        <div className='exportDialog'>
          <DialogComponent id="exportDialog" target={this.dglTarget} showCloseIcon={true} isModal={true} animationSettings={this.dialogAnimationSettings} width="400px" content={this.exportContent} buttons={UtilityMethods.prototype.getDialogButtons('export')} header="Export Diagram" visible={false}>
          </DialogComponent>
        </div>
        <div className='searchDialog'>
          <DialogComponent id="searchDialog" target={this.dglTarget} showCloseIcon={true} isModal={true} animationSettings={this.dialogAnimationSettings} width="400px" content={this.searchContent} buttons={UtilityMethods.prototype.getDialogButtons('search')} header="Search Nodes" visible={false}>
          </DialogComponent>
        </div>
      </div>
    </div>
    );
  }
}

//Click Event for orientation of the PropertyPanel.
function orientateClick(args) {
  var target = args.target;
  var diagram = document.getElementById("diagram").ej2_instances[0];
  if (target.className.includes('image-pattern-style2')) {
    // Remove the 'e-selected-orientation-style' class from all divs with the class 'image-pattern-style'
    var divs = document.getElementsByClassName('image-pattern-style2');
    for (var i = 0; i < divs.length; i++) {
      divs[i].classList.remove('e-selected-orientation-style');
    }
    // Add the 'e-selected-orientation-style' class to the selected div
    target.classList.add('e-selected-orientation-style');
    // Update the diagram orientation based on the selected div
    var orientation1 = target.id;
    diagram.layout.orientation = orientation1;
    diagram.dataBind();
    diagram.doLayout();
    diagram.fitToPage({ mode: 'Page', region: 'Content' });
  }
}

function subtreeClick(args) {
  var target = args.target;
  var diagram = document.getElementById("diagram").ej2_instances[0];
  if (target.className === 'image-pattern-style') {
    var subTreeOrientation;
    var subTreeAlignment;
    switch (target.id) {
      case 'pattern1':
        subTreeOrientation = 'Vertical';
        subTreeAlignment = 'Alternate';
        break;
      case 'pattern2':
        subTreeOrientation = 'Vertical';
        subTreeAlignment = 'Left';
        break;
      case 'pattern3':
        subTreeOrientation = 'Vertical';
        subTreeAlignment = 'Left';
        break;
      case 'pattern4':
        subTreeOrientation = 'Vertical';
        subTreeAlignment = 'Right';
        break;
      case 'pattern5':
        subTreeOrientation = 'Vertical';
        subTreeAlignment = 'Right';
        break;
      case 'pattern6':
        subTreeOrientation = 'Horizontal';
        subTreeAlignment = 'Balanced';
        break;
      case 'pattern7':
        subTreeOrientation = 'Horizontal';
        subTreeAlignment = 'Center';
        break;
      case 'pattern8':
        subTreeOrientation = 'Horizontal';
        subTreeAlignment = 'Left';
        break;
      case 'pattern9':
        subTreeOrientation = 'Horizontal';
        subTreeAlignment = 'Right';
        break;
      default:
        break;
    }
    // Remove the 'e-selected-orientation-style' class from all divs with the class 'image-pattern-style'
    var divs = document.getElementsByClassName('image-pattern-style');
    for (var i = 0; i < divs.length; i++) {
      divs[i].classList.remove('e-selected-pattern-style');
    }
    // Add the 'e-selected-orientation-style' class to the selected div
    target.classList.add('e-selected-pattern-style');
    diagram.layout.getLayoutInfo = function (node, options) {
      if (target.id === 'pattern4' || target.id === 'pattern3') {
        options.offset = -50;
      }
      if (node.data.Role === 'General Manager') {
        options.assistants.push(options.children[0]);
        options.children.splice(0, 1);
      }
      if (!options.hasSubTree) {
        options.orientation = subTreeOrientation;
        options.type = subTreeAlignment;
      }
    };
    diagram.dataBind();
    diagram.doLayout();
    diagram.fitToPage({ mode: 'Page', region: 'Content' });
  }
}
// To get the tooltip content of node.
function getContent(obj) {
  var tooltipContent = document.createElement('div');
  tooltipContent.innerHTML = `
      <div>
        <table style="border-collapse: collapse; width: 200px; background-color: #f4f4f4;">
          <tr>
            <td style="border: 1px solid #d3d3d3; padding: 5px; background-color: #e9e9e9;">Name:</td>
            <td style="border: 1px solid #d3d3d3; padding: 5px;">${obj.Name}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d3d3d3; padding: 5px; background-color: #e9e9e9;">Role:</td>
            <td style="border: 1px solid #d3d3d3; padding: 5px;">${obj.Designation}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d3d3d3; padding: 5px; background-color: #e9e9e9;">Empoyee ID:</td>
            <td style="border: 1px solid #d3d3d3; padding: 5px;">${obj.EmployeeID}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d3d3d3; padding: 5px; background-color: #e9e9e9;">Team:</td>
            <td style="border: 1px solid #d3d3d3; padding: 5px;">${obj.Team}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d3d3d3; padding: 5px; background-color: #e9e9e9;">Email ID::</td>
            <td style="border: 1px solid #d3d3d3; padding: 5px;">${obj.EmailId}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d3d3d3; padding: 5px; background-color: #e9e9e9;">Phone Number:</td>
            <td style="border: 1px solid #d3d3d3; padding: 5px;">${obj.PhoneNumber}</td>
          </tr>
        </table>
      </div>`;
  return tooltipContent;
}
export default App;

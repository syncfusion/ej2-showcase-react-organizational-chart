import { Node, randomId } from '@syncfusion/ej2-diagrams';
import UtilityMethods from './utilityMethods';
import { diagramInstance } from '../App';
export let dialogInstance;
export class DiagramClientSideEvents {
    render() {
        return (
            <div>
                <div App id='diagram' >
                </div>
                <div App id='defaultdialog'>

                </div>
            </div>
        );
    }
    dlgTarget = document.body;
    dialogInstance;
    // Selection change event.
    selectionChange(args) {
        var diagram = document.getElementById("diagram").ej2_instances[0];
        if (args.state === 'Changed') {
            this.applyFillColor(args.newValue);
            this.enableItems();
        }
        if (args.oldValue.length > 0 && (args.newValue.length === 0 || args.oldValue[0].id !== args.newValue[0].id)) {
            this.removeFillColor(args.oldValue);
        }
        if (args.newValue.length === 0) {
            this.disableItems();
        }
}
    // To apply fill color to the selected node.
    applyFillColor(obj) {
        const diagram = document.getElementById("diagram").ej2_instances[0];
        for (var i = 0; i < obj.length; i++) {
            if (obj[i] instanceof Node) {
                let outerContainer = document.getElementById(obj[i].id + '_outerstack');
                outerContainer.style.fill = obj[i].data.RatingColor;
                obj[i].style.fill = obj[i].data.RatingColor;
            }
        }
        diagram.dataBind();
    }
    // To enable items when we select node.
    enableItems() {
        var currentShapeTemplate = 'Image at left';
        if (currentShapeTemplate !== 'No image') {
            let pictureDropdown = document.getElementById('pictureDropdown');
            pictureDropdown.style.cssText = 'pointer-events: auto !important; opacity:1';
        }
        let assistantBtn = document.getElementById('addAssistantBtn');
        assistantBtn.style.cssText = 'pointer-events: auto !important; opacity:1; font-size:10px';
        let labelStyleItems = document.getElementsByClassName('item-singleSelect');
        for (let i = 0; i < labelStyleItems.length; i++) {
            if (labelStyleItems[i]) {
                labelStyleItems[i].classList.remove('e-overlay');
            }
        }

        let colorItems = document.getElementsByClassName('item-singleSelectColor');
        for (var i = 0; i < colorItems.length; i++) {
            colorItems[i].style.cssText = 'pointer-events: auto !important; opacity:1';
        }
    }
    // To remove fill color of selected node.
    removeFillColor(obj) {
        const diagram = document.getElementById("diagram").ej2_instances[0];
        for (var i = 0; i < obj.length; i++) {
            if (obj[i] instanceof Node) {
                let outerContainer = document.getElementById(obj[i].id + '_outerstack');
                outerContainer.style.fill = obj[i].data.Fill;
                obj[i].style.fill = obj[i].data.Fill;
            }
        }
        diagram.dataBind();
    }
    // To disable itmes when there is no selection
    disableItems() {
        var toolbarEditor = document.getElementById("toolbarEditor").ej2_instances[0];
        let pictureDropdown = document.getElementById('pictureDropdown');
        pictureDropdown.style.cssText = 'pointer-events: none !important; opacity:0.5';
        let assistantBtn = document.getElementById('addAssistantBtn');
        assistantBtn.style.cssText = 'pointer-events: none !important; opacity:0.5; font-size:10px';
        let labelStyleItems = document.getElementsByClassName('item-singleSelect');
        for (let i = 0; i < labelStyleItems.length; i++) {
            if (labelStyleItems[i]) {
                labelStyleItems[i].classList.add('e-overlay');
            }
        }
        let colorItems = document.getElementsByClassName('item-singleSelectColor');
        for (var j = 0; j < colorItems.length; j++) {
            colorItems[j].style.cssText = 'pointer-events: none !important; opacity:0.5';
        }
    }
    // To execute userhandle click.
    onUserHandleMouseDown(args) {
        let option = args.element.name;
        switch (option) {
            case 'Add New Child':
                this.addChild(args);
                break;
            case 'Expand':
            case 'Collapse':
                // this.expandCollapse(args);
                break;
            case 'Edit Fields':
                this.editFields(args);
                break;
        }
    }
    // To add child to the selected node.
    addChild(args) {
        const diagram = document.getElementById("diagram").ej2_instances[0];
        if (diagram.selectedItems.nodes.length > 0) {
            let data = diagram.dataSourceSettings.dataSource.dataSource.json;
            let newData = [{
                'Id': randomId(),
                'Name': 'Name',
                'Designation': 'Designation',
                'RatingColor': '#C34444',
                'ReportingPerson': diagram.selectedItems.nodes[0].data.Id,
                "ImageUrl": 'https://ej2.syncfusion.com/react/demos/src/diagram/employees/image13.png',
                "Team": "JavaScript",
                "EmployeeID": "SYNC10" + (data.length + 1),
                "EmailId": "newEmployee" + (data.length + 1) + "@gmail.com",
                "PhoneNumber": "0324 - 18193" + (data.length + 1),
                "IsBold": false, "IsItalic": false, "Decoration": "None",
                "FontFamily": "Arial", "FontSize": 12, "color": "black",
                "Fill": "white", "StrokeColor": "black",
            }];
            let newNode = { id: randomId(), data: newData[0], width: 100, height: 50 };
            diagram.add(newNode);
            let newConnector = { id: randomId(), sourceID: diagram.selectedItems.nodes[0].id, targetID: newNode.id };
            diagram.add(newConnector);
            diagram.dataSourceSettings.dataSource.dataSource.json = data.concat(newData);
            diagram.doLayout();
        }
    }
    // To append the values of selected node in the respective text boxed and to open the editNode dialog box.
    editFields(args) {
        var dialogInstance = document.getElementById("defaultdialog").ej2_instances[0];
        var diagram = document.getElementById("diagram").ej2_instances[0];
        let node = diagram.selectedItems.nodes[0];
        dialogInstance.target = document.body;
        let name = document.getElementById('name');
        let designation = document.getElementById('role');
        let employeeID = document.getElementById('empId');
        let team = document.getElementById('team');
        let email = document.getElementById('mail');
        let phoneNo = document.getElementById('phNumber');
        name.value = node.data.Name;
        designation.value = node.data.Designation;
        employeeID.value = node.data.EmployeeID;
        team.value = node.data.Team;
        email.value = node.data.EmailId;
        phoneNo.value = node.data.PhoneNumber;
        dialogInstance.visible = true;
        dialogInstance.dataBind();
    }
    // History change event.
    historyChange(args) {
        var toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        toolbarContainer.classList.remove('db-undo', 'db-redo');
    }
    // To update the zoom slider value based on diagram zoom
    scrollChange(args) {
        var zoomSlider = document.getElementById("zoomSlider").ej2_instances[0];
        if (args.panState === 'Progress') {
            var zoomValue = parseFloat(args.source.scrollSettings.currentZoom.toFixed(1));
            zoomSlider.value = zoomValue * 100;
            document.getElementById('zoomSliderText').value = Math.round(zoomSlider.value) + '%';
        }
    }
}
export default DiagramClientSideEvents;
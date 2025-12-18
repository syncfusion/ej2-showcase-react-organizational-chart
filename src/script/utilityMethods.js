import { defaultCurrencyCode } from "@syncfusion/ej2-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Diagram, DiagramTools, PrintAndExport, StackPanel, TextElement, PathElement, ImageElement } from "@syncfusion/ej2-react-diagrams";
import { UndoRedo, Inject } from "@syncfusion/ej2-react-diagrams";
import {expandIcon} from "../App";
import { canZoom } from "@syncfusion/ej2-diagrams/src/diagram/utility/constraints-util";
Diagram.Inject(UndoRedo, PrintAndExport);

export let currentShapeTemplate = 'Image at left';
export let btnExportClick;
var showHidePictures = [];
let matchingNodes = [];
let currentIndex = 0;
export class PaperSize {
}
export class UtilityMethods {
    constructor() {
        this.download = this.download();
        this.btnExportClick = this.btnExportClick.bind(this);
    }
    render() {
        return (
            <div App id='diagram' >
            </div>
        );
    }
    // To insert or remove or delete the picture of the node.
    insertOrRemovePicture(args) {
        let option = args.item.text;
        switch (option) {
            case 'Insert':
            case 'Change':
                document.getElementsByClassName('pictureUpload')[0].querySelector('button').click();
                break;
            case 'Delete':
            case 'Show/Hide':
                removePicture(option);
        }
    }
    // To choose whether to modify the image alignment or employee details.
    modifyNodeTemplate(args) {
        let expanable = document.getElementById('expandable').ej2_instances[0];
         if (expanable.checked) {
            expandIcon.expandIconShape = 'Minus';
            expandIcon.collapseIconShape = 'Plus';
        } else {
            expandIcon.expandIconShape  ='None';
            expandIcon.collapseIconShape = 'None';
        }
        var fieldsList = document.getElementById("multiCheckbox").ej2_instances[0];
        let template = args.item ? args.item.text : currentShapeTemplate;
        let newValue = args.value ? args.value : fieldsList.value;
        if (args.item && args.item.text) {
            if (template !== currentShapeTemplate) {
                currentShapeTemplate = template;
                updateNodeTemplate(newValue, template);
            }
            else {
                updateNodeTemplate(newValue, template);
            }
        }
        else {
            updateNodeTemplate(newValue, template);
        }
    }
    // To update page paper size
    paperListChange(args) {
        var value = args.value || args.item.value;
        var paperSize = this.getPaperSize(value);
        var diagram = document.getElementById("diagram").ej2_instances[0];
        var pageWidth = paperSize.pageWidth;
        var pageHeight = paperSize.pageHeight;
        if (pageWidth && pageHeight) {
            if (diagram.pageSettings.orientation === 'Portrait') {
                if (pageWidth > pageHeight) {
                    var temp = pageWidth;
                    pageWidth = pageHeight;
                    pageHeight = temp;
                }
            }
            else {
                if (pageHeight > pageWidth) {
                    var temp = pageHeight;
                    pageHeight = pageWidth;
                    pageWidth = temp;
                }
            }
            diagram.pageSettings.width = pageWidth;
            diagram.pageSettings.height = pageHeight;
        }
        else {
            diagram.pageSettings.width = 1460;
            diagram.pageSettings.height = 600;
        }
        diagram.dataBind();
    }
    // To get paper size
    getPaperSize(args) {
        var paperSize = new PaperSize();
        switch (args) {
            case 'Letter':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1056;
                break;
            case 'Legal':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1344;
                break;
            case 'Tabloid':
                paperSize.pageWidth = 1056;
                paperSize.pageHeight = 1632;
                break;
            case 'A0':
                paperSize.pageWidth = 3179;
                paperSize.pageHeight = 4494;
                break;
            case 'A1':
                paperSize.pageWidth = 2245;
                paperSize.pageHeight = 3179;
                break;
            case 'A2':
                paperSize.pageWidth = 1587;
                paperSize.pageHeight = 2245;
                break;
            case 'A3':
                paperSize.pageWidth = 1122;
                paperSize.pageHeight = 1587;
                break;
            case 'A4':
                paperSize.pageWidth = 793;
                paperSize.pageHeight = 1122;
                break;
            case 'A5':
                paperSize.pageWidth = 559;
                paperSize.pageHeight = 793;
                break;
            case 'A6':
                paperSize.pageWidth = 396;
                paperSize.pageHeight = 559;
                break;
        }
        return paperSize
    }
    // To update paper selection in menubar
    updateSelection(menuitem) {
        for (var i = 0; i < menuitem.parentObj.items.length; i++) {
            // To check the sub items of paper size menu item.
            if (menuitem.text === menuitem.parentObj.items[i].text) {
                menuitem.parentObj.items[i].iconCss = 'sf-icon-check-tick';
            }
            else {
                menuitem.parentObj.items[i].iconCss = '';
            }
        }
    }
    // To execute toolbar click operation
    toolbarClick(args) {
        var diagram = document.getElementById("diagram").ej2_instances[0];
        const commandType = args.item.tooltipText.replace(/[' ']/g, '').toLowerCase();
        const exportDialog = document.getElementById("exportDialog").ej2_instances[0];
        let item = args.item.tooltipText;
        switch (commandType.toLowerCase()) {
            case 'savediagram':
                var data = diagram.saveDiagram();
                download(data);
                break;
            case 'opendiagram':
                document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                break;
            case 'printdiagram':
                btnPrintClick();
                break;
            case 'exportdiagram':
                document.getElementById("exportfileName").value=document.getElementById('diagramName').innerHTML;
                exportDialog.show();
                break;
            case 'undo':
                diagram.undo();
                break;
            case 'redo':
                diagram.redo();
                break;
            case 'bold':
                applyStyle('bold');
                break;
            case 'italic':
                applyStyle('italic');
                break;
            case 'underline':
                applyStyle('underline');
                break;
            case 'selecttool':
                diagram.clearSelection();
                diagram.tool = DiagramTools.Default;
                break;
            case 'pantool':
                diagram.clearSelection()
                diagram.tool = DiagramTools.ZoomPan;
                break;
            case 'overview':
                let position = document.getElementById('overview-container').style.position;
                if (position === 'absolute') {
                    document.getElementById('overview-container').style.position = '';
                    document.getElementById('overview-container').style.zIndex = "-1";
                    args.item.cssClass = args.item.cssClass.replace('active', '');
                } else {
                    document.getElementById('overview-container').style.position = "absolute";
                    document.getElementById('overview-container').style.zIndex = "1000";
                    args.item.cssClass += ' active';
                    let overview = document.getElementById('overview').ej2_instances[0];
                    overview.refresh();
                }
                break;
        }
        if (item === 'Select Tool' || item === 'Pan Tool') {
            if (args.item.cssClass.indexOf('tb-item-selected') === -1) {
                removeSelectedToolbarItem();
                args.item.cssClass += ' tb-item-selected';
            }
        }
        diagram.dataBind();
    };
    // To get the butons for the dialog.
    getDialogButtons(dialogType) {
        const buttons = [];
        // eslint-disable-next-line
        switch (dialogType) {
            case 'export':
                buttons.push({
                    click: this.btnExportClick, buttonModel: { content: 'Export', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'search':
                buttons.push({
                    click: this.btnSearchClick, buttonModel: { cssClass: 'e-flat e-db-primary', iconCss: 'e-icons e-search', isPrimary: true }
                },
                    {
                        click: this.btnPrevClick.bind(this),
                        buttonModel: { content: '&#171; Previous', cssClass: 'e-flat e-db-primary', isPrimary: true, fontSize: 20 }
                    }, {
                    click: this.btnNextClick.bind(this),
                    buttonModel: { content: 'Next &#187;', cssClass: 'e-flat e-db-primary', isPrimary: true }
                }
                );
                break;
        }
        if (dialogType !== 'search') {
            buttons.push({
                click: this.btnCancelClick, buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
            });
        }
        return buttons;
    }
    // To export the diagram.
    btnExportClick(args) {
        var diagram = document.getElementById("diagram").ej2_instances[0];
        var exportDialog = document.getElementById("exportDialog").ej2_instances[0];
        var hOffset = diagram.scrollSettings.horizontalOffset;
        var vOffset = diagram.scrollSettings.verticalOffset;
        var zoom = diagram.scrollSettings.currentZoom;
        localStorage.setItem('export', diagram.saveDiagram());
        diagram.loadDiagram(localStorage.getItem('export'));
        diagram.exportDiagram({
            fileName: document.getElementById("exportfileName").value,
            format: document.getElementById("exportFormat").value,
            mode: 'Download'
        });
        if (zoom <= 0.45) {
            diagram.fitToPage({ mode: 'Page', region: 'Content' });
        } else {
            diagram.scrollSettings.horizontalOffset = hOffset;
            diagram.scrollSettings.verticalOffset = vOffset;
        }
        diagram.dataBind();
        exportDialog.hide();
    }
    // To get cancel button for dialog
    btnCancelClick() {
        var exportDialog = document.getElementById("exportDialog").ej2_instances[0];
        //To hide dialog
        exportDialog.hide();
    }

    // To search the nodes in diagram
    btnSearchClick(args) {
        const selectedValue = document.getElementById('searchDropDown').value;
        const searchText = document.getElementById('searchBox').value.trim().toLowerCase();
        var diagram = document.getElementById("diagram").ej2_instances[0];
        matchingNodes = [];
        currentIndex = 0;
        diagram.clearSelection();

        if (!searchText) return; // Skip if empty

        matchingNodes = diagram.nodes.filter(node => {
            const data = node.data;
            const fieldValue = (field) =>
                data[field] ? data[field].toString().toLowerCase() : '';

            switch (selectedValue) {
                case 'Name':
                    return fieldValue('Name').includes(searchText);
                case 'Employee ID':
                    return fieldValue('EmployeeID').includes(searchText);
                case 'Designation':
                    return fieldValue('Designation').includes(searchText);
                case 'Team':
                    return fieldValue('Team').includes(searchText);
                case 'Email ID':
                    return fieldValue('EmailId').includes(searchText);
                case 'Phone Number':
                    return fieldValue('PhoneNumber').includes(searchText);
                default:
                    return false;
            }
        });

        if (matchingNodes.length > 0) {
            diagram.select([matchingNodes[currentIndex]]);
        }
    }

    // To get the previous node in search
    btnPrevClick() {
        if (matchingNodes.length > 0) {
            var diagram = document.getElementById("diagram").ej2_instances[0];
            currentIndex = (currentIndex - 1 + matchingNodes.length) % matchingNodes.length;
            diagram.select([matchingNodes[currentIndex]]);
        }
    };
    // To get the next node in search
    btnNextClick() {
        if (matchingNodes.length > 0) {
            var diagram = document.getElementById("diagram").ej2_instances[0];
            currentIndex = (currentIndex + 1) % matchingNodes.length;
            diagram.select([matchingNodes[currentIndex]]);
        }
    };
    // To Change font color of the selected node.
    fontColorChange(args) {
        var parameter = { itemData: { text: args.value }, itemValue: 'fontColor' };
        this.fontStyleChange(parameter);
    };
    // To Change fill color of the selected node.
    fillColorChange(args) {
        var diagram = document.getElementById("diagram").ej2_instances[0];
        var fillColor = args.value;
        for (var i = 0; i < diagram.selectedItems.nodes.length; i++) {
            let outerContainer = document.getElementById(diagram.selectedItems.nodes[i].id + '_outerstack');
            outerContainer.style.fill = fillColor;
            diagram.selectedItems.nodes[i].addInfo.fill = fillColor;
            diagram.selectedItems.nodes[i].data.Fill = fillColor;
            diagram.selectedItems.nodes[i].style.fill = fillColor;
        }
        diagram.dataBind();
    };
    // To Change stroke color of the selected node.
    strokeColorChange(args) {
        var diagram = document.getElementById("diagram").ej2_instances[0];
        var strokeColor = args.value;
        for (var i = 0; i < diagram.selectedItems.nodes.length; i++) {
            let outerContainer = document.getElementById(diagram.selectedItems.nodes[i].id + '_outerstack');
            outerContainer.style.stroke = strokeColor;
            diagram.selectedItems.nodes[i].data.StrokeColor = strokeColor;
            diagram.selectedItems.nodes[i].style.strokeColor = strokeColor;
        }
        diagram.dataBind();
    };
    // To modify the zoom value of diagram.
    zoomChange(args) {
        if (args.isInteracted) {
            var zoom = {};
            var diagram = document.getElementById("diagram").ej2_instances[0];
            zoom.zoomFactor = ((args.value / 100) / diagram.scrollSettings.currentZoom) - 1;
            diagram.zoomTo(zoom);
            document.getElementById('zoomSliderText').value = args.value.toString() + '%';
            diagram.dataBind();
        }
    }
    // To Change font style of the selected node.
    fontStyleChange(args) {
        var type;
        var font = args.itemData.text;
        var diagram = document.getElementById("diagram").ej2_instances[0];
        var node = diagram.selectedItems.nodes[0];
        if (args.value) {
            type = 'fontSize';
            node.data.FontSize = font;
        } else if (args.itemData.text === 'bold') {
            type = 'bold';
        } else if (args.itemData.text === 'italic') {
            type = 'italic';
        }
        else if (args.itemData.text === 'underline') {
            type = 'underline';
        }
        else if (args.itemValue === 'fontColor') {
            type = 'fontColor';
            node.data.color = font;
        }
        else {
            type = 'fontFamily';
            node.data.FontFamily = font;
        }
        var name = document.getElementById(node.id + '_text1_text');
        if (name) {
            if (type === 'fontSize') {
                name.style.fontSize = font;
                var nameText = document.getElementById(node.id + '_text1_text');
                const baseSize = 12;
                const size = parseInt(font, 10) || baseSize;
                const baseChars = 13;
                const max = Math.max(6, Math.round((baseSize / size) * baseChars));
                if (nameText) {
                    let nameTspanElement = nameText.querySelector('tspan');
                    if (nameTspanElement) {
                        const fullName = (node.data && node.data.Name) || '';
                        nameTspanElement.textContent = truncateText(fullName, max);
                    }
                }
            }
            else if (type === 'bold') {
                name.style.fontWeight = node.data.IsBold ? 'bold' : 'normal';
            } else if (type === 'italic') {
                name.style.fontStyle = node.data.IsItalic ? 'italic' : 'normal';
            } else if (type === 'underline') {
                name.style.textDecoration = node.data.Decoration;
            } else if (type === 'fontColor') {
                name.style.fill = font;
            } else {
                name.style.fontFamily = font;
            }
        }
        var desig = document.getElementById(node.id + '_desig_text');
        if (desig) {
            if (type === 'fontSize') {
                desig.style.fontSize = font;
                var desigText = document.getElementById(node.id + '_desig_text');
                const baseSize = 12;
                const size = parseInt(font, 10) || baseSize;
                const baseChars = 11;
                const max = Math.max(6, Math.round((baseSize / size) * baseChars));
                if (desigText) {
                    let designTspanElement = desigText.querySelector('tspan');
                    if (designTspanElement) {
                        const fullDesig = (node.data && node.data.Designation) || '';
                        designTspanElement.textContent = truncateText(fullDesig, max);
                    }
                }
            } else if (type === 'bold') {
                desig.style.fontWeight = node.data.IsBold ? 'bold' : 'normal';
            }
            else if (type === 'italic') {
                desig.style.fontStyle = node.data.IsItalic ? 'italic' : 'normal';
            }
            else if (type === 'underline') {
                desig.style.textDecoration = node.data.Decoration;
            }
            else if (type === 'fontColor') {
                desig.style.fill = font;
            }
            else {
                desig.style.fontFamily = font;
            }
        }
        var team = document.getElementById(node.id + '_team_text');
        if (team) {
            if (type === 'fontSize') {
                team.style.fontSize = font;
                var teamTextEl = document.getElementById(node.id + '_team_text');
                const baseSize = 12;
                const size = parseInt(font, 10) || baseSize;
                const baseChars = 13;
                const max = Math.max(6, Math.round((baseSize / size) * baseChars));
                if (teamTextEl) {
                    let teamTspan = teamTextEl.querySelector('tspan');
                    if (teamTspan) {
                        const fullTeam = (node.data && node.data.Team) || '';
                        teamTspan.textContent = truncateText(fullTeam, max);
                    }
                }
            }
            else if (type === 'bold') {
                team.style.fontWeight = node.data.IsBold ? 'bold' : 'normal';
            }
            else if (type === 'italic') {
                team.style.fontStyle = node.data.IsItalic ? 'italic' : 'normal';
            }
            else if (type === 'underline') {
                team.style.textDecoration = node.data.Decoration;
            }
            else if (type === 'fontColor') {
                team.style.fill = font;
            }
            else {
                team.style.fontFamily = font;
            }
        }
        var email = document.getElementById(node.id + '_email_text');
        if (email) {
            if (type === 'fontSize') {
                email.style.fontSize = font;
                var emailTextEl = document.getElementById(node.id + '_email_text');
                const baseSize = 12;
                const size = parseInt(font, 10) || baseSize;
                const baseChars = 12;
                const max = Math.max(6, Math.round((baseSize / size) * baseChars));
                if (emailTextEl) {
                    let emailTspan = emailTextEl.querySelector('tspan');
                    if (emailTspan) {
                        const fullEmail = (node.data && node.data.EmailId) || '';
                        emailTspan.textContent = truncateText(fullEmail, max);
                    }
                }
            }
            else if (type === 'bold') {
                email.style.fontWeight = node.data.IsBold ? 'bold' : 'normal';
            }
            else if (type === 'italic') {
                email.style.fontStyle = node.data.IsItalic ? 'italic' : 'normal';
            }
            else if (type === 'underline') {
                email.style.textDecoration = node.data.Decoration;
            }
            else if (type === 'fontColor') {
                email.style.fill = font;
            }
            else {
                email.style.fontFamily = font;
            }
        }
        var phone = document.getElementById(node.id + '_phone_text');
        if (phone) {
            if (type === 'fontSize') {
                phone.style.fontSize = font;
                var phoneTextEl = document.getElementById(node.id + '_phone_text');
                const baseSize = 12;
                const size = parseInt(font, 10) || baseSize;
                const baseChars = 3;
                const max = Math.max(6, Math.round((baseSize / size) * baseChars));
                if (phoneTextEl) {
                    let phoneTspan = phoneTextEl.querySelector('tspan');
                    if (phoneTspan) {
                        const fullPhone = (node.data && node.data.PhoneNumber) || '';
                        phoneTspan.textContent = truncateText(fullPhone, max);
                    }
                }
            }
            else if (type === 'bold') {
                phone.style.fontWeight = node.data.IsBold ? 'bold' : 'normal';
            }
            else if (type === 'italic') {
                phone.style.fontStyle = node.data.IsItalic ? 'italic' : 'normal';
            }
            else if (type === 'underline') {
                phone.style.textDecoration = node.data.Decoration;
            }
            else if (type === 'fontColor') {
                phone.style.fill = font;
            }
            else {
                phone.style.fontFamily = font;
            }
        }
        var employeeID = document.getElementById(node.id + '_eid_text');
        if (employeeID) {
            if (type === 'fontSize') {
                employeeID.style.fontSize = font;
                var eidTextEl = document.getElementById(node.id + '_eid_text');
                const baseSize = 12;
                const size = parseInt(font, 10) || baseSize;
                const baseChars = 10;
                const max = Math.max(6, Math.round((baseSize / size) * baseChars));
                if (eidTextEl) {
                    let eidTspan = eidTextEl.querySelector('tspan');
                    if (eidTspan) {
                        const fullEid = (node.data && node.data.EmployeeID) || '';
                        eidTspan.textContent = truncateText(fullEid, max);
                    }
                }
            }
            else if (type === 'bold') {
                employeeID.style.fontWeight = node.data.IsBold ? 'bold' : 'normal';
            }
            else if (type === 'italic') {
                employeeID.style.fontStyle = node.data.IsItalic ? 'italic' : 'normal';
            }
            else if (type === 'underline') {
                employeeID.style.textDecoration = node.data.Decoration;
            }
            else if (type === 'fontColor') {
                employeeID.style.fill = font;
            }
            else {
                employeeID.style.fontFamily = font;
            }
        }
    }
    addImageToWrapper (node, obj, url) {
        if (node.wrapper && node.wrapper.children && node.wrapper.children[0] && node.wrapper.children[0].children) {
            // Use obj?.imageUrl for optional chaining, or url as a fallback, or an empty string as the default.
            const imageUrl = obj?.imageUrl || url || '';

            // Iterate over each child and set the source to the determined imageUrl
            for (let i = 0; i < node.wrapper.children[0].children.length; i++) {
                let child = node.wrapper.children[0].children[i];

                // Ensure the child actually has a source property before setting it
                if (child instanceof ImageElement) {
                    child.source = imageUrl;
                }
            }
        }
    }
}
function getMaxCharsFor(fontPx, baseChars) {
    const baseSize = 12;
    const size = parseInt(fontPx, 10) || baseSize;
    const scaled = Math.round((baseSize / size) * baseChars);
    return Math.max(6, scaled);
}
function truncateText(text, maxLength) {
    if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}
export default UtilityMethods;
// To update the setNodeTemplate method of diagram.
function updateNodeTemplate(newValue, template) {
    var diagram = document.getElementById("diagram").ej2_instances[0];
    diagram.setNodeTemplate = (obj, diagram) => {
        var fieldsList = document.getElementById("multiCheckbox").ej2_instances[0];
        let content = new StackPanel();
        content.id = obj.id + '_outerstack';
        content.orientation = 'Horizontal';
        content.style.fill = obj.data.Fill;
        content.style.strokeColor = obj.data.StrokeColor;
        content.padding = { left: 5, right: 10, top: 5, bottom: 5 };

        // Add the line at the top of the outer stack
        let line = new PathElement();
        line.data = 'M0,0 L1,0'; // Line from (0,0) to (1,0)
        line.width = 100;
        line.height = 10;
        line.style.strokeWidth = 2;
        line.style.strokeColor = (obj.data).RatingColor;
        line.horizontalAlignment = 'Left';
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
        innerStack.margin = { left: 5, right: 0, top: 5, bottom: 0 };
        innerStack.horizontalAlignment = template === 'Image at left' ? 'Left' : 'Center';
        innerStack.id = obj.id + '_innerstack';
        let text; let desigText; let teamText; let eidText; let emailText; let phoneText;
        let childElements = [line];
        let isEmail = false;
        if (newValue.indexOf('Name') !== -1) {
            text = new TextElement();
            text.content = truncateText((obj.data).Name, getMaxCharsFor((obj.data).FontSize || '12px', 12));
            text.style.color = obj.data.color;
            text.style.bold = obj.data.IsBold;
            text.style.italic = obj.data.IsItalic;
            text.style.textDecoration = obj.data.Decoration;
            text.style.fontSize = obj.data.FontSize;
            text.style.fontFamily = obj.data.FontFamily;
            text.style.strokeColor = 'none';
            text.horizontalAlignment = 'Left';
            text.style.fill = 'none';
            text.id = obj.id + '_text1';
            childElements.push(text);
        }
        if (newValue.indexOf('Desig') !== -1) {
            desigText = new TextElement();
            desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
            desigText.content = truncateText((obj.data).Designation, getMaxCharsFor((obj.data).FontSize || '14px', 10));
            desigText.style.color = obj.data.color;
            desigText.style.strokeColor = 'none';
            desigText.style.fontSize = obj.data.FontSize;
            desigText.style.fontFamily = obj.data.FontFamily;
            desigText.style.bold = obj.data.IsBold;
            desigText.style.italic = obj.data.IsItalic;
            desigText.style.textDecoration = obj.data.Decoration;
            desigText.style.fill = 'none';
            desigText.horizontalAlignment = 'Left';
            desigText.style.textWrapping = 'Wrap';
            desigText.id = obj.id + '_desig';
            childElements.push(desigText);
        }
        if (newValue.indexOf('Team') !== -1) {
            teamText = new TextElement();
            teamText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
            teamText.content = truncateText((obj.data).Team, getMaxCharsFor((obj.data).FontSize || '14px', 12));
            teamText.style.color = obj.data.color;
            teamText.style.strokeColor = 'none';
            teamText.style.fontSize = obj.data.FontSize;
            teamText.style.fontFamily = obj.data.FontFamily;
            teamText.style.bold = obj.data.IsBold;
            teamText.style.italic = obj.data.IsItalic;
            teamText.style.textDecoration = obj.data.Decoration;
            teamText.style.fill = 'none';
            teamText.horizontalAlignment = 'Left';
            teamText.style.textWrapping = 'Wrap';
            teamText.id = obj.id + '_team';
            childElements.push(teamText);
        }
        if (newValue.indexOf('EID') !== -1) {
            eidText = new TextElement();
            eidText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
            eidText.content = truncateText((obj.data).EmployeeID, getMaxCharsFor((obj.data).FontSize || '14px', 10));
            eidText.style.color = obj.data.color;
            eidText.style.strokeColor = 'none';
            eidText.style.fontSize = obj.data.FontSize;
            eidText.style.fontFamily = obj.data.FontFamily;
            eidText.style.bold = obj.data.IsBold;
            eidText.style.italic = obj.data.IsItalic;
            eidText.style.textDecoration = obj.data.Decoration;
            eidText.style.fill = 'none';
            eidText.horizontalAlignment = 'Left';
            eidText.style.textWrapping = 'Wrap';
            eidText.id = obj.id + '_eid';
            childElements.push(eidText);
        }
        if (newValue.indexOf('Email') !== -1) {
            emailText = new TextElement();
            emailText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
            emailText.content = truncateText((obj.data).EmailId, getMaxCharsFor((obj.data).FontSize || '14px', 12));
            emailText.style.color = obj.data.color;
            emailText.style.strokeColor = 'none';
            emailText.style.fontSize = obj.data.FontSize;
            emailText.style.fontFamily = obj.data.FontFamily;
            emailText.style.bold = obj.data.IsBold;
            emailText.style.italic = obj.data.IsItalic;
            emailText.style.textDecoration = obj.data.Decoration;
            emailText.style.fill = 'none';
            emailText.horizontalAlignment = 'Left';
            emailText.style.textWrapping = 'Wrap';
            emailText.id = obj.id + '_email';
            isEmail = true;
            childElements.push(emailText);
        }
        if (newValue.indexOf('Phone') !== -1) {
            phoneText = new TextElement();
            phoneText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
            phoneText.content = truncateText((obj.data).PhoneNumber, getMaxCharsFor((obj.data).FontSize || '14px', 12));
            phoneText.style.color = obj.data.color;
            phoneText.style.strokeColor = 'none';
            phoneText.style.fontSize = obj.data.FontSize;
            phoneText.style.fontFamily = obj.data.FontFamily;
            phoneText.style.bold = obj.data.IsBold;
            phoneText.style.italic = obj.data.IsItalic;
            phoneText.style.textDecoration = obj.data.Decoration;
            phoneText.style.fill = 'none';
            phoneText.horizontalAlignment = 'Left';
            phoneText.style.textWrapping = 'Wrap';
            phoneText.id = obj.id + '_phone';
            childElements.push(phoneText);
        }

        innerStack.children = childElements;

        if (fieldsList.value.length < 3) {
            content.width = 160;
            if (template === 'No image' || template === 'Image at left') {
                content.height = 80;
            } else {
                content.height = 140 + image.height;
            }
        }
        else if (fieldsList.value.length == 3) {
            content.width = 160;
            if (template === 'No image' || template === 'Image at left') {
                content.height = 110;
            } else {
                content.height = 110 + image.height;
            }
        }
        else if (fieldsList.value.length == 4) {
            content.width = 160;
            if (template === 'No image' || template === 'Image at left') {
                content.height = 130;
            } else {
                content.height = 130 + image.height;
            }
        } else if (fieldsList.value.length > 4) {
            content.width = 160;
            if (template === 'No image' || template === 'Image at left') {
                content.height = 180;
            } else {
                content.height = 180 + image.height;
            }
        } else {
            content.width = 160;
            content.height = 100;
        }

        if (template === 'No image') {
            content.children = [innerStack];
            content.width = content.width - image.width;
        } else if (template === 'Image at left') {
            content.children = [image, innerStack];
        }
        else {
            content.orientation = 'Vertical';
            content.width = content.width - image.width;
            content.children = [image, innerStack];
        }
        if (fieldsList.value.length === 0) {
            if (template === 'No image') {
                content.width = 100;
                content.height = 50;
            }
        }
        return content;
    };
    diagram.dataBind();
    diagram.clear();
    diagram.refresh();
    diagram.fitToPage({ canZoomOut: true });
    updateDiagramViews(diagram);
};
function updateDiagramViews(diagram){
        // While calling diagram refresh, the overview is removed from the diagram views causing diagram not visible after load or creating new page.
        const overview = document.getElementById('overview').ej2_instances[0];
        if (diagram.views.length === 1 && diagram.views[0] !== 'overview') {
            diagram.views.push(overview.element.id);
            diagram.views[overview.element.id] = overview;
        }
    }
// To remove the picture of the node.
function removePicture(option) {
    var diagram = document.getElementById("diagram").ej2_instances[0];
    let node = diagram.selectedItems.nodes[0];
    let id = diagram.selectedItems.nodes[0].data.Id;
    let nodeObj = diagram.dataSourceSettings.dataSource.dataSource.json.find((obj) => obj.Id === id);
    var imageTag = document.getElementById(diagram.selectedItems.nodes[0].id + '_picimage');
    if (option === 'Delete') {
        nodeObj.ImageUrl = '';
        if (imageTag) {
            imageTag.href.baseVal = '';
        }
        removeImageFromWrapper(node);
    } else {
        if (nodeObj.ImageUrl !== '') {
            showHidePictures.push({ id: nodeObj.Id, imageUrl: nodeObj.ImageUrl });
            nodeObj.ImageUrl = '';
            if (imageTag) {
                imageTag.href.baseVal = '';
            }
            removeImageFromWrapper(node);
        } else {
            let obj = showHidePictures.find((item) => item.id === nodeObj.Id);
            nodeObj.ImageUrl = obj ? obj.imageUrl : '';
            if (imageTag) {
                imageTag.href.baseVal = obj ? obj.imageUrl : '';
            }
            UtilityMethods.prototype.addImageToWrapper(node, obj);
            // Find the index of the object in showHidePictures
            let index = showHidePictures.findIndex((item) => item.id === nodeObj.Id);
            // If the object exists in showHidePictures, remove it using splice()
            if (index !== -1) {
                showHidePictures.splice(index, 1);
            }
        }
    }
};
    function removeImageFromWrapper (node) {
        if(node.wrapper.children[0].children) {
            for (let i=0 ; i< node.wrapper.children[0].children.length; i++) {
                let child = node.wrapper.children[0].children[i];
                if (child && child instanceof ImageElement) {
                    child.source = '';
                }
            }
        }
    }

// To remove toolbar selected item
function removeSelectedToolbarItem() {
    var toolbarObj = document.getElementById("toolbarEditor").ej2_instances[0];
    for (var i = 0; i < toolbarObj.items.length; i++) {
        var item = toolbarObj.items[i];
        if (item.cssClass.indexOf('tb-item-selected') !== -1 && item.tooltipText !== 'Overview') {
            item.cssClass = item.cssClass.replace(' tb-item-selected', '');
        }
    }
    toolbarObj.dataBind();
}
// To download diagram json.
function download(data) {
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
// To print the diagram.
function btnPrintClick() {
    var diagram = document.getElementById("diagram").ej2_instances[0];
    let options = { region: 'Content' };
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
}
// To apply annotation style to selected Node.
function applyStyle(style) {
    var diagram = document.getElementById("diagram").ej2_instances[0];
    let node = diagram.selectedItems.nodes[0];
    switch (style) {
        case 'bold':
            node.data.IsBold = !node.data.IsBold;
            break;
        case 'italic':
            node.data.IsItalic = !node.data.IsItalic;
            break;
        case 'underline':
            node.data.Decoration = node.data.Decoration === 'Underline' ? 'None' : 'Underline';
            break;
    };
    var args = { itemData: { text: style } };
    UtilityMethods.prototype.fontStyleChange(args);
};


import { GridInputAutoGen, GridInputFitting} from "./autoGen";
import { SectionPointDictFn, StationListFn, StGenerator } from "./context";
import { CPBMainPart } from "./mainPart";

export function MainPartDefaultDataAutoGen() {
    this.addInput("girderLayout", "object");
    this.addInput("girderBaseInfo", "object");
    this.addInput("option", "string");
    this.addOutput("GridInput", "object");
  }
  MainPartDefaultDataAutoGen.prototype.onExecute = function () {
    if (this.getInputData(3) === "HM") {
    //   const result = GridInputAutoGenForHM(this.getInputData(0), this.getInputData(1), this.getInputData(2));
    //   this.setOutputData(0, result);
    } else {
      const result = GridInputAutoGen(this.getInputData(0), this.getInputData(1));
      this.setOutputData(0, result);
    }
  }

  export function MainPartInputFit() {
    this.addInput("MainPartInput", "object");
    this.addOutput("FittedMainPartInput", "object");
  }
  MainPartInputFit.prototype.onExecute = function () {
      const result = GridInputFitting(this.getInputData(0));
      this.setOutputData(0, result);
  }

  export function GenStPointDict() {
    this.addInput("girderLayout", "girderLayout");
    this.addInput("girderBaseInfo", "object");
    this.addInput("MainPartInput", "object");
    this.addOutput("stPointDict", "object");
  }
  
  GenStPointDict.prototype.onExecute = function () {
    this.setOutputData(0, StGenerator(this.getInputData(0), this.getInputData(1), this.getInputData(2)))
  }

  export function StationList() {
    this.addInput("stPointDict", "object");
    this.addInput("girderLayout", "girderLayout");
    this.addInput("xbeamLayout", "arr");
    this.addOutput("centerLineStation", "");
    this.addOutput("girderStation", "");
    this.addOutput("xbeamGrid", "");
  }
  
  StationList.prototype.onExecute = function () {
    const result = StationListFn(this.getInputData(0), this.getInputData(1), this.getInputData(2))
    this.setOutputData(0, result.centerLine)
    this.setOutputData(1, result.girder)
    this.setOutputData(2, result.xbeamGrid)
  }

  export function InitPoint() {
    this.addInput("stPointDict", "object");
  
    this.addOutput("Point", 0);
  }
  
  InitPoint.prototype.onExecute = function () {
    this.getInputData(0);
    const pt = this.getInputData(0)["G1S1"]
    // console.log(0, {...pt, z: 0})
    this.setOutputData(0, { ...pt, z: 0 })
  }

  export function SectionPointDict(){
    this.addInput("stPointDict","object");
    this.addInput("girderBaseInfo","object");
    this.addInput("MainPartInput","object");
    this.addOutput("sectionPointDict","object");
  }
  SectionPointDict.prototype.onExecute = function() {
    this.setOutputData(0, SectionPointDictFn(this.getInputData(0), this.getInputData(1), this.getInputData(2)))
  }

  export function GenMainPartModel(){
    this.addInput("stPointDict","object");
    this.addInput("girderStation",0);
    this.addInput("sectionPointDict","object");
    this.addInput("MainPartInput","object");
    this.addInput("MainPartSectionInput","object");
    this.addInput("entrance","object");
    this.addOutput("mainPartModel","object");
  }
  GenMainPartModel.prototype.onExecute = function() {
    const result = CPBMainPart(this.getInputData(0), this.getInputData(1), this.getInputData(2), this.getInputData(3), this.getInputData(4), this.getInputData(5))
    this.setOutputData(0, result)
  }
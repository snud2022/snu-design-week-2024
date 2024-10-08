// Generated by Framer (c3ab1ed)
import{jsx as _jsx}from"react/jsx-runtime";import{addFonts,addPropertyControls,ControlType,cx,Image,useVariantState,withCSS}from"framer";import{LayoutGroup,motion}from"framer-motion";import*as React from"react";const cycleOrder=["fFRwzMiMC","QVbm2eJP9"];const variantClassNames={fFRwzMiMC:"framer-v-6rwvru",QVbm2eJP9:"framer-v-1xhdlkx"};function addPropertyOverrides(overrides,...variants){const nextOverrides={};variants===null||variants===void 0?void 0:variants.forEach(variant=>variant&&Object.assign(nextOverrides,overrides[variant]));return nextOverrides;}const humanReadableVariantMap={close:"fFRwzMiMC",open:"QVbm2eJP9"};const transitions={default:{damping:60,delay:0,duration:.3,ease:[.44,0,.56,1],mass:1,stiffness:500,type:"spring"}};function toResponsiveImage_194x2gw(value){if(typeof value==="object"&&value!==null&&typeof value.src==="string"){return value;}return typeof value==="string"?{src:value}:undefined;}const BASE62="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";function useRandomID(){const ref=React.useRef(null);if(ref.current===null){ref.current=Array(5).fill(0).map(()=>BASE62[Math.floor(Math.random()*BASE62.length)]).join("");}return ref.current;}const Component=/*#__PURE__*/ React.forwardRef(function({id,style:externalStyle={},className,width,height,layoutId,variant:outerVariant="fFRwzMiMC",image:Cc1Y4Zf3q={src:new URL("assets/x1eNAuflOzKL7T7vB91hOuOoXGM.png",import.meta.url).href},...restProps},ref){const outerVariantId=humanReadableVariantMap[outerVariant];const variant=outerVariantId||outerVariant;const{baseVariant,classNames,gestureVariant,setGestureState,setVariant,transition,variants}=useVariantState({cycleOrder,defaultVariant:"fFRwzMiMC",transitions,variant,variantClassNames});const layoutDependency=variants.join("-")+restProps.layoutDependency;const defaultLayoutId=useRandomID();const{pointerEvents,...style}=externalStyle;return /*#__PURE__*/ _jsx(LayoutGroup,{id:layoutId!==null&&layoutId!==void 0?layoutId:defaultLayoutId,children:/*#__PURE__*/ _jsx(motion.div,{"data-framer-generated":true,initial:variant,animate:variants,onHoverStart:()=>setGestureState({isHovered:true}),onHoverEnd:()=>setGestureState({isHovered:false}),onTapStart:()=>setGestureState({isPressed:true}),onTap:()=>setGestureState({isPressed:false}),onTapCancel:()=>setGestureState({isPressed:false}),className:cx("framer-00uVE",classNames),style:{display:"contents",pointerEvents:pointerEvents!==null&&pointerEvents!==void 0?pointerEvents:undefined},children:/*#__PURE__*/ _jsx(Image,{...restProps,background:{alt:"",fit:"fill",intrinsicHeight:80,intrinsicWidth:80,pixelHeight:160,pixelWidth:160,...toResponsiveImage_194x2gw(Cc1Y4Zf3q)},className:cx("framer-6rwvru",className),"data-framer-name":"close",layoutDependency:layoutDependency,layoutId:"fFRwzMiMC",ref:ref,style:{rotate:0,...style},transition:transition,variants:{QVbm2eJP9:{rotate:180}},...addPropertyOverrides({QVbm2eJP9:{"data-framer-name":"open"}},baseVariant,gestureVariant)})})});});const css=['.framer-00uVE [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none;}',"@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",".framer-00uVE * { box-sizing: border-box; }",".framer-00uVE .framer-6rwvru { height: 40px; overflow: visible; position: relative; width: 40px; }",".framer-00uVE.framer-v-1xhdlkx .framer-6rwvru { aspect-ratio: 1 / 1; height: var(--framer-aspect-ratio-supported, 40px); }"];/**
 * This is a generated Framer component.
 * @framerIntrinsicHeight 40
 * @framerIntrinsicWidth 40
 * @framerCanvasComponentVariantDetails {"propertyName":"variant","data":{"default":{"layout":["fixed","fixed"]},"QVbm2eJP9":{"layout":["fixed","fixed"]}}}
 * @framerVariables {"Cc1Y4Zf3q":"image"}
 */ const FramerMk4IIFv4f=withCSS(Component,css);export default FramerMk4IIFv4f;FramerMk4IIFv4f.displayName="Buttons";FramerMk4IIFv4f.defaultProps={height:40,width:40};addPropertyControls(FramerMk4IIFv4f,{variant:{options:["fFRwzMiMC","QVbm2eJP9"],optionTitles:["close","open"],title:"Variant",type:ControlType.Enum},Cc1Y4Zf3q:{__defaultAssetReference:"x1eNAuflOzKL7T7vB91hOuOoXGM.png",title:"Image",type:ControlType.ResponsiveImage}});addFonts(FramerMk4IIFv4f,[]);
export const __FramerMetadata__ = {"exports":{"Props":{"type":"tsType","annotations":{"framerContractVersion":"1"}},"default":{"type":"reactComponent","name":"FramerMk4IIFv4f","slots":[],"annotations":{"framerContractVersion":"1","framerIntrinsicHeight":"40","framerIntrinsicWidth":"40","framerCanvasComponentVariantDetails":"{\"propertyName\":\"variant\",\"data\":{\"default\":{\"layout\":[\"fixed\",\"fixed\"]},\"QVbm2eJP9\":{\"layout\":[\"fixed\",\"fixed\"]}}}","framerVariables":"{\"Cc1Y4Zf3q\":\"image\"}"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./Mk4IIFv4f.map
/**
 * Entry point for development and production PWA builds.
 */
import 'regenerator-runtime/runtime';
import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigPoint, loadSearchConfigPoint } from "config-point";

/**
 * EXTENSIONS
 * =================
 *
 * Importing and modifying the extensions our app uses HERE allows us to leverage
 * tree shaking and a few other niceties. However, by including them here they become
 * "baked in" to the published application.
 *
 * Depending on your use case/needs, you may want to consider not adding any extensions
 * by default HERE, and instead provide them via the extensions configuration key or
 * by using the exported `App` component, and passing in your extensions as props using
 * the defaultExtensions property.
 */
import OHIFDefaultExtension from '@ohif/extension-default';
import OHIFCornerstoneExtension from '@ohif/extension-cornerstone';
import OHIFMeasurementTrackingExtension from '@ohif/extension-measurement-tracking';
import OHIFDICOMSRExtension from '@ohif/extension-dicom-sr';
import OHIFDICOMVIDEOExtension from '@ohif/extension-dicom-video';
import OHIFDICOMPDFExtension from '@ohif/extension-dicom-pdf';

/** Combine our appConfiguration and "baked-in" extensions */
const appProps = {
  config: window ? window.config : {},
  defaultExtensions: [
    OHIFDefaultExtension,
    OHIFCornerstoneExtension,
    OHIFMeasurementTrackingExtension,
    OHIFDICOMSRExtension,
    OHIFDICOMVIDEOExtension,
    OHIFDICOMPDFExtension,
  ],
};

const { defaultTheme="theme" } = appProps.config;
/**
 * Load the default theme settings,
 * and then render the app in the then block so that themes get
 * loaded early enough to modify the initial render.
 */
loadSearchConfigPoint(defaultTheme, '/theme', 'theme').then(() => {
  /** Create App */
  const app = React.createElement(App, appProps, null);
  /** Render */
  ReactDOM.render(app, document.getElementById('root'));
}).catch(reason => {
  console.warn("Unable to load application because", reason);
})

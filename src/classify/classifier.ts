import { GenericHandTrackingData } from '@/devices';
import { Observable } from '@reactivex/rxjs';

export interface ClassificationData {
    actionName: string;
    metrics: ClassificationMetrics;
}

export interface ClassificationMetrics {
    quality: number;
}

export interface ClassifierMetadata {
    name: string;
    desc: string;
}

export enum SettingType {
    Number, Slider, String
}

interface Setting {
    type: SettingType
}

export interface Number extends Setting {
    type: SettingType.Number;
    value: number;
}

export interface String extends Setting {
    type: SettingType.String;
    value: string;
}

export interface Slider extends Setting {
    type: SettingType.Slider;
    value: number;
    min: number;
    max: number;
    step: number;
}

export interface ClassifierSetting {
    name: string;
    desc: string;
    setting: Setting;
}

export interface Classifier {
    classify(source: Observable<GenericHandTrackingData>): Observable<ClassificationData>
}
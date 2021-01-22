import { has, includes } from 'lodash-es';

export interface Option {
  disabled: boolean;
  text: string;
  value: string | number;
}

export interface EnumEntity {
  key: string;
  value: number | string;
  text: string;
}

export interface IEnum {
  [key: string]: any;
  getEntityByValue(key: string): EnumEntity;
  getEntityByKey(key: string): EnumEntity;
  getTextFromKey(key: string): string | undefined;
  getTextFromValue(key: string): string | undefined;
  toValueArray(): (string | number)[];
  toKeyArray(): string[];
  toOptions(values?: (string | number)[]): Option[];
  toOmittedOptions(values?: (string | number)[]): Option[];
}

/**
 * Enum
 *
 * @class
 */
export default class Enum implements IEnum {
  [key: string]: any;

  protected entities: EnumEntity[]

  private readonly valueIdx: { [key: string]: EnumEntity }

  private readonly keyIdx: { [key: string]: EnumEntity }

  /**
   * `Enum` 构造函数
   *
   * @constructor
   * @param {Object[]} entities entities
   */
  public constructor(entities: EnumEntity[] = []) {
    this.valueIdx = {};
    this.keyIdx = {};

    this.entities = entities || [];
    // eslint-disable-next-line no-underscore-dangle
    this._parseEntities(entities);
  }

  /**
   * 根据 `value` 获取枚举实例
   *
   * @param {string|number} value
   * @return {Object|null}
   */
  public getEntityByValue(value: string) {
    return this.valueIdx[value] || null;
  }

  /**
   * 根据 `key` 获取枚举实例
   *
   * @param {string|number} key
   * @return {Object|null}
   */
  public getEntityByKey(key: string) {
    return this.keyIdx[key] || null;
  }

  /**
   * 根据 `key` 获取 `text`
   *
   * @param {string} key key
   * @return {string}
   */
  public getTextFromKey(key: string) {
    const e = this.keyIdx[key];
    return e && (e.text || e.key);
  }

  /**
   * 根据 `value` 获取 `text`
   */
  public getTextFromValue(value: string) {
    const e = this.valueIdx[value];
    return e && (e.text || e.key);
  }

  /**
   * to value array
   */
  public toValueArray() {
    return this.entities.map(e => e.value);
  }

  /**
   * to key array
   */
  public toKeyArray() {
    return this.entities.map(e => (e.key || e.text));
  }

  /**
   * 判断是否是 『未知』 的选项
   */
  public isUnknownOption(e: EnumEntity) {
    return e.key === 'UNKNOWN';
  }

  /**
   * to select,radio,checkbox option array
   *
   * @return {Array}
   */
  public toOptions(values: Array<string | number>) {
    return this.entities
      .map((e) => {
        // 过滤掉未知选项，未知选项前端不应该展示
        if (this.isUnknownOption(e)) {
          return null;
        }

        const option = {
          value: e.value,
          text: e.text,
        };
        return !values || includes(values, option.value)
          ? option
          : null;
      })
      .filter(Boolean) as Option[];
  }

  public toOmittedOptions(values: Array<string | number>) {
    return this.entities
      .map((e) => {
        // 过滤掉未知选项，未知选项前端不应该展示
        if (this.isUnknownOption(e)) {
          return null;
        }

        const option = {
          value: e.value,
          text: e.text,
        };
        return includes(values, option.value)
          ? null
          : option;
      })
      .filter(Boolean) as Option[];
  }

  /**
   * 解析 `entities`
   *
   * @param {Array<Object>} entities entities
   */
  protected _parseEntities(entities: EnumEntity[] = []) {
    // eslint-disable-next-line no-underscore-dangle
    entities.forEach((entity, index) => this._parseEntity(entity, String(index)));
  }

  /**
   * 解析 `entity`
   *
   * @param {Object} entity entity
   * @param {Object} entity.key key
   * @param {Object} entity.text text
   * @param {Object} entity.value value
   * @param {number} idx idx
   */
  private _parseEntity(entity: EnumEntity, idx: string) {
    let {
      // eslint-disable-next-line prefer-const
      key,
      // eslint-disable-next-line prefer-const
      text,
      value,
    } = entity;
    // 如果没有 `key`，就把 `text` 当 `key`
    key = key || text;

    value = (value === undefined || value === null) ? idx : value;

    if (has(this, value)) {
      throw new Error(`Enum already has value: ${value}`);
    }

    if (has(this, key)) {
      throw new Error(`Enum already has key: ${key}`);
    }

    // Assign to `this`
    this[value] = key;
    this[String(key)] = value;

    // Add to index
    this.valueIdx[value] = entity;
    this.keyIdx[key] = entity;
  }
}

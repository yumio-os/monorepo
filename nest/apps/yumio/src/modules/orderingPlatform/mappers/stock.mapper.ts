import { StockLevel } from '@yumio/modules/core';

import { OPStockLevel } from '../models/topLineItem.model';

export function mapCoreStockLevelToOp(stock: StockLevel) {
  if (!stock) {
    return null;
  }

  const target = new OPStockLevel();
  target.id = stock.id;
  target.amount = stock.amount;

  return target;
}

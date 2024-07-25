import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { SearchResultDto } from '../../resource/search/dto';

export function SearchApi() {
    return applyDecorators(ApiOkResponse({ type: SearchResultDto }));
}

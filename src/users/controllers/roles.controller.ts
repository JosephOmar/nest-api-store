import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get()
  getRoles() {
    return this.roleService.getAllRoles();
  }

  @Get(':roleId')
  findRole(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.roleService.getOneRole(roleId);
  }

  @Post()
  createRole(@Body() payload: CreateRoleDto) {
    return this.roleService.createRole(payload);
  }

  @Put(':roleId')
  updateRole(
    @Body() payload: UpdateRoleDto,
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    return this.roleService.updateRole(roleId, payload);
  }

  @Delete(':roleId')
  deleteRole(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.roleService.deleteRole(roleId);
  }
}

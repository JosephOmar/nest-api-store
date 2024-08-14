import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  getAllRoles() {
    return this.roleRepo.find();
  }

  async getOneRole(roleId: number) {
    const role = await this.roleRepo.findOne({
      where: { roleId: roleId },
    });
    if (!role) {
      throw new NotFoundException(`Role ${roleId} not found`);
    }
    return role;
  }

  createRole(data: CreateRoleDto) {
    const newRole = this.roleRepo.create(data);
    return this.roleRepo.save(newRole);
  }

  async updateRole(roleId: number, changes: UpdateRoleDto) {
    const role = await this.getOneRole(roleId);
    this.roleRepo.merge(role, changes);
    return this.roleRepo.save(role);
  }

  async deleteRole(roleId: number) {
    const deleteResult = await this.roleRepo.delete(roleId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Role ${roleId} not found`);
    }
    return deleteResult;
  }
}

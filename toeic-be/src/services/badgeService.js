class BadgeService {
  constructor(models) {
    this.Badge = models.Badge;
  }

  async getAll(includeDeleted = false) {
    const scope = includeDeleted ? "withDeleted" : undefined;
    return await this.Badge.scope(scope).findAll();
  }

  async getById(id) {
    return await this.Badge.findByPk(id);
  }

  async getDeleted() {
    return await this.Badge.scope("onlyDeleted").findAll();
  }

  async create(input) {
    return await this.Badge.create(input);
  }

  async update(id, input) {
    const badge = await this.Badge.findByPk(id);
    if (!badge) throw new Error("Không tìm thấy huy hiệu");
    return await badge.update(input);
  }

  async softDelete(id) {
    const badge = await this.Badge.findByPk(id);
    if (!badge) throw new Error("Huy hiệu không tồn tại");
    await badge.destroy();
    return badge;
  }

  async restore(id) {
    const badge = await this.Badge.scope("onlyDeleted").findByPk(id);
    if (!badge) throw new Error("Không tìm thấy huy hiệu đã xoá");
    await badge.restore();
    return badge;
  }

  async forceDelete(id) {
    const badge = await this.Badge.findByPk(id, { paranoid: false });
    if (!badge) throw new Error("Không tìm thấy huy hiệu để xoá vĩnh viễn");
    await badge.destroy({ force: true });
    return badge;
  }
}

module.exports = BadgeService;

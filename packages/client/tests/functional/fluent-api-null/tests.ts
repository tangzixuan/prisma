/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { randomBytes } from 'crypto'
import { expectTypeOf } from 'expect-type'

import testMatrix from './_matrix'
// @ts-ignore
import type { Child, PrismaClient, Resource } from './generated/prisma/client'

declare let prisma: PrismaClient

const nonExistingId = randomBytes(12).toString('hex')

testMatrix.setupTestSuite(() => {
  describe('regular client', () => {
    test('findFirst', async () => {
      const result = await prisma.resource.findFirst().children()

      expect(result).toBeNull()
      expectTypeOf(result).toBeNullable()
    })

    test('findUnique', async () => {
      const result = await prisma.resource.findUnique({ where: { id: nonExistingId } }).children()

      expect(result).toBeNull()
      expectTypeOf(result).toBeNullable()
    })

    test('findFirstOrThrow', async () => {
      const result = prisma.resource.findFirstOrThrow().children()

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('findUniqueOrThrow', async () => {
      const result = prisma.resource.findUniqueOrThrow({ where: { id: nonExistingId } }).children()

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('create', async () => {
      const result = await prisma.resource.create({ data: {} }).children()

      await prisma.resource.deleteMany()

      expect(result).toStrictEqual([])
      expectTypeOf(result).not.toBeNullable()
    })

    test('update', async () => {
      const result = prisma.resource.update({ where: { id: nonExistingId }, data: {} }).children()

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('upsert', async () => {
      const result = await prisma.resource.upsert({ where: { id: nonExistingId }, update: {}, create: {} }).children()

      await prisma.resource.deleteMany()

      expect(result).toStrictEqual([])
      expectTypeOf(result).not.toBeNullable()
    })

    test('findFirst with select', async () => {
      const result = await prisma.resource.findFirst().children({
        select: {
          id: true,
        },
      })

      expect(result).toBeNull()
      expectTypeOf(result).toBeNullable()
    })

    test('findUnique with select', async () => {
      const result = await prisma.resource.findUnique({ where: { id: nonExistingId } }).children({
        select: {
          id: true,
        },
      })

      expect(result).toBeNull()
      expectTypeOf(result).toBeNullable()
    })

    test('findFirstOrThrow with select', async () => {
      const result = prisma.resource.findFirstOrThrow().children({
        select: {
          id: true,
        },
      })

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('findUniqueOrThrow with select', async () => {
      const result = prisma.resource.findUniqueOrThrow({ where: { id: nonExistingId } }).children({
        select: {
          id: true,
        },
      })

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('create with select', async () => {
      const result = await prisma.resource.create({ data: {} }).children({
        select: {
          id: true,
        },
      })

      await prisma.resource.deleteMany()

      expect(result).toStrictEqual([])
      expectTypeOf(result).not.toBeNullable()
    })

    test('update with select', async () => {
      const result = prisma.resource.update({ where: { id: nonExistingId }, data: {} }).children({
        select: {
          id: true,
        },
      })

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('upsert with select', async () => {
      const result = await prisma.resource.upsert({ where: { id: nonExistingId }, update: {}, create: {} }).children({
        select: {
          id: true,
        },
      })

      await prisma.resource.deleteMany()

      expect(result).toStrictEqual([])
      expectTypeOf(result).not.toBeNullable()
    })

    test('findFirst with include', async () => {
      const result = await prisma.resource.findFirst().children({
        include: {
          parent: true,
        },
      })

      expect(result).toBeNull()
      expectTypeOf(result).toBeNullable()
    })

    test('findUnique with include', async () => {
      const result = await prisma.resource.findUnique({ where: { id: nonExistingId } }).children({
        include: {
          parent: true,
        },
      })

      expect(result).toBeNull()
      expectTypeOf(result).toBeNullable()
    })

    test('findFirstOrThrow with include', async () => {
      const result = prisma.resource.findFirstOrThrow().children({
        include: {
          parent: true,
        },
      })

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('findUniqueOrThrow with include', async () => {
      const result = prisma.resource.findUniqueOrThrow({ where: { id: nonExistingId } }).children({
        include: {
          parent: true,
        },
      })

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('create with include', async () => {
      const result = await prisma.resource.create({ data: {} }).children({
        include: {
          parent: true,
        },
      })

      await prisma.resource.deleteMany()

      expect(result).toStrictEqual([])
      expectTypeOf(result).not.toBeNullable()
    })

    test('update with include', async () => {
      const result = prisma.resource.update({ where: { id: nonExistingId }, data: {} }).children({
        include: {
          parent: true,
        },
      })

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('upsert with include', async () => {
      const result = await prisma.resource.upsert({ where: { id: nonExistingId }, update: {}, create: {} }).children({
        include: {
          parent: true,
        },
      })

      await prisma.resource.deleteMany()

      expect(result).toStrictEqual([])
      expectTypeOf(result).not.toBeNullable()
    })

    test('findUniqueOrThrow with optional to-one relation', () => {
      const result = prisma.child
        .findUniqueOrThrow({
          where: {
            id: '123',
          },
        })
        .parent()

      expectTypeOf<Awaited<typeof result>>().toEqualTypeOf<Resource | null>()
    })

    test('findFirstOrThrow with optional to-one relation', () => {
      const result = prisma.child
        .findUniqueOrThrow({
          where: {
            id: '123',
          },
        })
        .parent()

      expectTypeOf<Awaited<typeof result>>().toEqualTypeOf<Resource | null>()
    })

    test('findUniqueOrThrow with optional to-one relation circling back to to-many relation', () => {
      const result = prisma.child
        .findUniqueOrThrow({
          where: {
            id: '123',
          },
        })
        .parent()
        .children()

      expectTypeOf<Awaited<typeof result>>().toEqualTypeOf<Child[] | null>()
    })

    test('findFirstOrThrow with optional to-one relation circling back to to-many relation', () => {
      const result = prisma.child
        .findUniqueOrThrow({
          where: {
            id: '123',
          },
        })
        .parent()
        .children()

      expectTypeOf<Awaited<typeof result>>().toEqualTypeOf<Child[] | null>()
    })
  })

  describe('extended client', () => {
    test('findFirst', async () => {
      const result = await prisma.$extends({}).resource.findFirst().children()

      expect(result).toBeNull()
      expectTypeOf(result).toBeNullable()
    })

    test('findUnique', async () => {
      const result = await prisma
        .$extends({})
        .resource.findUnique({ where: { id: nonExistingId } })
        .children()

      expect(result).toBeNull()
      expectTypeOf(result).toBeNullable()
    })

    test('findFirstOrThrow', async () => {
      const result = prisma.$extends({}).resource.findFirstOrThrow().children()

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('findUniqueOrThrow', async () => {
      const result = prisma
        .$extends({})
        .resource.findUniqueOrThrow({ where: { id: nonExistingId } })
        .children()

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('create', async () => {
      const result = await prisma.$extends({}).resource.create({ data: {} }).children()

      await prisma.$extends({}).resource.deleteMany()

      expect(result).toStrictEqual([])
      expectTypeOf(result).not.toBeNullable()
    })

    test('update', async () => {
      const result = prisma
        .$extends({})
        .resource.update({ where: { id: nonExistingId }, data: {} })
        .children()

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('upsert', async () => {
      const result = await prisma
        .$extends({})
        .resource.upsert({ where: { id: nonExistingId }, update: {}, create: {} })
        .children()

      await prisma.$extends({}).resource.deleteMany()

      expect(result).toStrictEqual([])
      expectTypeOf(result).not.toBeNullable()
    })

    test('findFirst with select', async () => {
      const result = await prisma
        .$extends({})
        .resource.findFirst()
        .children({
          select: {
            id: true,
          },
        })

      expect(result).toBeNull()
      expectTypeOf(result).toBeNullable()
    })

    test('findUnique with select', async () => {
      const result = await prisma
        .$extends({})
        .resource.findUnique({ where: { id: nonExistingId } })
        .children({
          select: {
            id: true,
          },
        })

      expect(result).toBeNull()
      expectTypeOf(result).toBeNullable()
    })

    test('findFirstOrThrow with select', async () => {
      const result = prisma
        .$extends({})
        .resource.findFirstOrThrow()
        .children({
          select: {
            id: true,
          },
        })

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('findUniqueOrThrow with select', async () => {
      const result = prisma
        .$extends({})
        .resource.findUniqueOrThrow({ where: { id: nonExistingId } })
        .children({
          select: {
            id: true,
          },
        })

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('create with select', async () => {
      const result = await prisma
        .$extends({})
        .resource.create({ data: {} })
        .children({
          select: {
            id: true,
          },
        })

      await prisma.$extends({}).resource.deleteMany()

      expect(result).toStrictEqual([])
      expectTypeOf(result).not.toBeNullable()
    })

    test('update with select', async () => {
      const result = prisma
        .$extends({})
        .resource.update({ where: { id: nonExistingId }, data: {} })
        .children({
          select: {
            id: true,
          },
        })

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('upsert with select', async () => {
      const result = await prisma
        .$extends({})
        .resource.upsert({ where: { id: nonExistingId }, update: {}, create: {} })
        .children({
          select: {
            id: true,
          },
        })

      await prisma.$extends({}).resource.deleteMany()

      expect(result).toStrictEqual([])
      expectTypeOf(result).not.toBeNullable()
    })

    test('findFirst with include', async () => {
      const result = await prisma
        .$extends({})
        .resource.findFirst()
        .children({
          include: {
            parent: true,
          },
        })

      expect(result).toBeNull()
      expectTypeOf(result).toBeNullable()
    })

    test('findUnique with include', async () => {
      const result = await prisma
        .$extends({})
        .resource.findUnique({ where: { id: nonExistingId } })
        .children({
          include: {
            parent: true,
          },
        })

      expect(result).toBeNull()
      expectTypeOf(result).toBeNullable()
    })

    test('findFirstOrThrow with include', async () => {
      const result = prisma
        .$extends({})
        .resource.findFirstOrThrow()
        .children({
          include: {
            parent: true,
          },
        })

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('findUniqueOrThrow with include', async () => {
      const result = prisma
        .$extends({})
        .resource.findUniqueOrThrow({ where: { id: nonExistingId } })
        .children({
          include: {
            parent: true,
          },
        })

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('create with include', async () => {
      const result = await prisma
        .$extends({})
        .resource.create({ data: {} })
        .children({
          include: {
            parent: true,
          },
        })

      await prisma.$extends({}).resource.deleteMany()

      expect(result).toStrictEqual([])
      expectTypeOf(result).not.toBeNullable()
    })

    test('update with include', async () => {
      const result = prisma
        .$extends({})
        .resource.update({ where: { id: nonExistingId }, data: {} })
        .children({
          include: {
            parent: true,
          },
        })

      await expect(result).rejects.toThrow()
      expectTypeOf(result).resolves.not.toBeNullable()
    })

    test('upsert with include', async () => {
      const result = await prisma
        .$extends({})
        .resource.upsert({ where: { id: nonExistingId }, update: {}, create: {} })
        .children({
          include: {
            parent: true,
          },
        })

      await prisma.$extends({}).resource.deleteMany()

      expect(result).toStrictEqual([])
      expectTypeOf(result).not.toBeNullable()
    })
  })

  test('findUniqueOrThrow with optional to-one relation', () => {
    const result = prisma
      .$extends({})
      .child.findUniqueOrThrow({
        where: {
          id: '123',
        },
      })
      .parent()

    expectTypeOf<Awaited<typeof result>>().toEqualTypeOf<Resource | null>()
  })

  test('findFirstOrThrow with optional to-one relation', () => {
    const result = prisma
      .$extends({})
      .child.findUniqueOrThrow({
        where: {
          id: '123',
        },
      })
      .parent()

    expectTypeOf<Awaited<typeof result>>().toEqualTypeOf<Resource | null>()
  })

  test('findUniqueOrThrow with optional to-one relation circling back to to-many relation', () => {
    const result = prisma
      .$extends({})
      .child.findUniqueOrThrow({
        where: {
          id: '123',
        },
      })
      .parent()
      .children()

    expectTypeOf<Awaited<typeof result>>().toEqualTypeOf<Child[] | null>()
  })

  test('findFirstOrThrow with optional to-one relation circling back to to-many relation', () => {
    const result = prisma
      .$extends({})
      .child.findUniqueOrThrow({
        where: {
          id: '123',
        },
      })
      .parent()
      .children()

    expectTypeOf<Awaited<typeof result>>().toEqualTypeOf<Child[] | null>()
  })
})
